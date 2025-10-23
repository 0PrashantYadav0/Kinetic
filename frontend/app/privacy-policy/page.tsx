export default function PrivacyPolicy() {
    return (
        <main className='w-full flex flex-col items-center py-24'>
            <section className='w-full max-w-2xl flex flex-col gap-4'>
                <h1 className='font-bold text-2xl'>Privacy Policy</h1>
                <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our app, particularly when signing in with Google OAuth.</p>

                <h1 className='font-bold text-xl'>Information We Collect</h1>
                <p>When you use Google OAuth to sign in, we collect the following information from your Google account:</p>
                <ul>
                    <li>Email Address: Your primary Google Account email address.</li>
                    <li>Profile Information: Your publicly available personal information, such as your name and profile picture.</li>
                    <li>OpenID: Used to associate you with your Google account.</li>
                </ul>

                <h1 className='font-bold text-xl'>How We Use Your Information</h1>
                <p>We use the information collected to:</p>
                <ul>
                    <li>Authenticate your identity and allow you to log in to the app.</li>
                    <li>Display your basic profile information, such as your name or profile picture, within the app.</li>
                    <li>Ensure a personalized and secure user experience.</li>
                </ul>

                <h1 className='font-bold text-xl'>Data Sharing and Security</h1>
                <p>We do not sell, trade, or rent your personal information to others. Your data is securely stored and only accessible by the app for authentication purposes and to display your profile information.</p>
                <p>However, please note that we rely on Google's OAuth service for authentication, and their handling of your data is subject to Google's Privacy Policy.</p>

                <h1 className='font-bold text-xl'>Your Choices</h1>
                <p>You can revoke the app's access to your Google account at any time by going to your Google Account settings and removing the app's permissions.</p>

                <h1 className='font-bold text-xl'>Changes to This Privacy Policy</h1>
                <p>We reserve the right to update this Privacy Policy as necessary. We encourage you to review this page periodically for any changes. Continued use of the app after updates will constitute your acknowledgment and acceptance of those changes.</p>

                <h1 className='font-bold text-xl'>Contact Us</h1>
                <p>If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at <a href='mailto:trevor.wright.710@gmail.com' className='underline'>trevor.wright.710@gmail.com</a>.</p>
            </section>
        </main>
    )
}