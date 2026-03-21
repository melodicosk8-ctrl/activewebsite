import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

chatbot_html = """<!-- Floating Chatbot -->
    <div class="chatbot-container">
        <button class="chatbot-btn" id="chatbot-toggle" aria-label="Open Chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
        <div class="chatbot-window" id="chatbot-window">
            <div class="chatbot-header">
                <h3>Active Assistant</h3>
                <button id="chatbot-close">&times;</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
                <div class="message bot">Hello! How can I help you with your exterior cleaning needs?</div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="chatbot-text" placeholder="Type a message...">
                <button id="chatbot-send">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    </div>"""

# Remove whatsapp completely from files that have it but wasn't caught
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it already has chatbot, skip
    if 'chatbot-container' in content:
        continue

    # Try to add right before </body> or <script src="script.js">
    if '<script src="script.js">' in content:
        new_content = content.replace('<script src="script.js">', chatbot_html + '\n    <script src="script.js">')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Added chatbot to {file}')
