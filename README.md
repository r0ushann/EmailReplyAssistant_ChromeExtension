# EmailReplyAssistant_ChromeExtension

* The Backend Logic of this Extension is made with Java + SpringBoot and the code can be accessed via my [Github Repository](https://github.com/r0ushann/AIEmailReplyGenerator_Spring_Backend)

* The Backend uses Spring boot and java via rest Controller to fetch Gemini AI Api
* The backend uses the REST protocol to make API calls on the remote Gemini API
* Then the response is parsed into the mail via MDN object Tree Model and DOM

## 🚀 How to Add and Unpack this Chrome Extension (Step-by-Step Guide)
If you wish to use this Extension locally on your device, clone this repository and follow this steps:

🔹 Step 1: Open Chrome Extensions Page
1️⃣ Open Google Chrome.
2️⃣ In the address bar, type:

arduino
Copy
Edit
chrome://extensions/
3️⃣ Press Enter to open the Extensions page.

🔹 Step 2: Enable Developer Mode
1️⃣ On the top right corner of the Extensions page, find the "Developer mode" toggle.
2️⃣ Turn it ON (It will reveal extra options like "Load unpacked").

🔹 Step 3: Load Your Local Extension

1️⃣ Click "Load unpacked" (button will appear after enabling Developer Mode).
2️⃣ A file picker will open—navigate to your extension folder.

Select the folder that contains manifest.json (this is your extension’s configuration file).
3️⃣ Click "Select Folder".
🔹 Step 4: Verify Installation
1️⃣ Your extension should now appear in the list of installed extensions.
2️⃣ If everything is correct, Chrome will load it without errors.
3️⃣ You can now test the extension directly from Chrome!

🔹 Step 5: Update the Extension (If Needed)
If you make changes to your extension’s code:
1️⃣ Go back to the Chrome Extensions page (chrome://extensions/).
2️⃣ Find your extension and click "Reload" (circular arrow button).
3️⃣ Your changes will apply immediately without reinstalling.

🔹 Step 6: Pin the Extension (Optional)
1️⃣ Click the puzzle icon 🧩 on the Chrome toolbar (next to the address bar).
2️⃣ Find your extension and click the pin icon 📌 to make it visible.

🚀 That’s It! 🎉
Your local Chrome extension is now installed and ready for testing. Let me know if you need any help! 🚀
Click on compose or Reply button of the desired mail to reply.

Here is the Screenshots that might help you to get the visual Idea of the implementation..

select the tone you wish to reply the mail with
![image](https://github.com/user-attachments/assets/2db5182a-e461-45ee-91f1-e061440fc9d3)

Generate the reply powered with AI
![image](https://github.com/user-attachments/assets/db755b08-de64-4aaa-bcfb-0d2d5c521095)


