console.log("Email Reply Generator Extension - Content Script Loaded");

function createToneSelector() {
    const select = document.createElement('select');
    select.className = 'ai-tone-selector';
    select.style.marginRight = '8px';
    select.style.padding = '6px';
    select.style.borderRadius = '6px';
    select.style.fontSize = '14px';
    select.style.cursor = 'pointer';

    const tones = [
        { value: '', text: 'None' },
        { value: 'friendly', text: 'Friendly' },
        { value: 'professional', text: 'Professional' },
        { value: 'casual', text: 'Casual' }
    ];

    tones.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone.value;
        option.textContent = tone.text;
        select.appendChild(option);
    });

    return select;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
    button.style.marginRight = '8px';
     button.style.padding = '10px 16px'; // Adjust padding for better size
    button.style.fontSize = '14px'; // Slightly larger text
    button.style.fontWeight = 'bold';
    button.style.color = 'white'; // White text for contrast
    button.style.borderRadius = '20px'; // Rounded corners
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease-in-out';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found, Loading AI button and tone selector");

    // Create AI Reply button
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    // Create tone selector
    const toneSelector = createToneSelector();

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const selectedTone = toneSelector.value; // Get selected tone

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailContent: emailContent, tone: selectedTone })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box was not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    // Insert selector and button in toolbar
    toolbar.insertBefore(toneSelector, toolbar.firstChild);
    toolbar.insertBefore(button, toolbar.firstChild);
}

// Mutation observer to detect compose window
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
