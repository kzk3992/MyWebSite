export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export const englishContent = {
  home: {
    description: "Small ideas, built into useful products. The official website of Mika Spark Studio.",
    heroLead: "Small ideas, built into useful products.",
    worksIntro: "Turning everyday sparks into tangible apps and games. Here is what is currently in development.",
    aboutParagraphs: [
      "Mika Spark Studio is an independent development studio where one developer designs, builds, and publishes apps and games.",
      "It creates small, useful, and playful experiences—one product at a time.",
    ],
    aboutLink: "About the studio",
  },
  about: {
    description: "About Mika Spark Studio, an independent studio creating apps, games, tools, and small experiments.",
    lead: "Mika Spark Studio is an independent development studio where one developer creates and publishes apps and games.",
    heading: "Turning curiosity into working products.",
    body: "New ideas, useful systems, and playful experiences are shaped carefully and released one at a time. The focus is not on scale, but on products that make a small, meaningful difference in everyday life.",
  },
  support: {
    description: "Support for apps and games from Mika Spark Studio.",
    lead: "Choose a product to find frequently asked questions and contact information.",
    heading: "Support by product",
    productDescription: "Support information for this {platform} app",
  },
  hirame: {
    description: "Hirame is an idea-training app for iPhone and iPad that uses word combinations, associations, and other constraints to help you practice creative thinking.",
    tagline: "Turn constraints into ideas.",
    coreTitle: "Constraints give ideas somewhere to start.",
    coreIntro: "Hirame helps you practice creative thinking through manageable constraints such as word combinations, themes, and associations. You remain at the center of the process, while Apple Intelligence can offer new angles, questions, reviews, and possible next steps when you need them.",
    features: [
      { title: "Idea Note", description: "Capture ideas in writing and add images or drawings. Find them later through Library search, favorites, or Calendar." },
      { title: "Random Fusion", description: "Explore five methods used in the app: Random Fusion, SCAMPER, Reverse Thinking, Constraint Ideation, and Analogy Thinking." },
      { title: "BRIDGE", description: "Connect distant concepts through word associations and build a meaningful path from START to GOAL." },
      { title: "Think with AI", description: "On supported devices, use Apple Intelligence to expand ideas, review them, ask questions, and identify a next step." },
    ],
    screenshotsIntro: "A look at Hirame's concept and key features through current app screens.",
    screenshots: [
      { src: "/brand/hirame/screens/01-concept.png", label: "CONCEPT", alt: "Hirame's constraint-driven concept and Home screen" },
      { src: "/brand/hirame/screens/02-note.png", label: "IDEA NOTE", alt: "An Idea Note for capturing and developing an idea" },
      { src: "/brand/hirame/screens/03-with-ai.png", label: "WITH AI", alt: "Idea support and review powered by Apple Intelligence" },
      { src: "/brand/hirame/screens/04-random-fusion.png", label: "RANDOM FUSION", alt: "The idea-method selection screen, including Random Fusion" },
      { src: "/brand/hirame/screens/05-library.png", label: "LIBRARY", alt: "The Library for searching saved ideas" },
      { src: "/brand/hirame/screens/06-association.png", label: "BRIDGE", alt: "BRIDGE, the word-association game" },
    ],
  },
  hirameSupport: {
    description: "Frequently asked questions, troubleshooting, data, privacy, and contact information for Hirame.",
    lead: "Find answers about Hirame, how it handles data, and how to report an issue.",
    faqs: [
      { question: "Do I need to create an account?", answer: "No. Hirame does not currently require account registration." },
      { question: "Where is my data stored?", answer: "Idea Notes, images, drawings, and idea-training history are stored on your device. When iCloud is available, they are synced across devices signed in to the same Apple Account through a private CloudKit database. Hirame does not send your note content to a server operated by Mika Spark Studio." },
      { question: "Can I use Hirame without iCloud sync?", answer: "Yes. If you are not signed in to iCloud or CloudKit is unavailable, Hirame falls back to local storage on the device. Hirame does not include a separate in-app switch for sync; manage iCloud access in your device settings." },
      { question: "What happens to my data if I delete the app?", answer: "Deleting the app normally removes its local data. Data already synced to iCloud may remain there and may sync again after you reinstall Hirame using the same Apple Account. If you use the in-app data deletion option while iCloud sync is active, the deletion is synced to iCloud as well." },
      { question: "Can I move my data to a new device?", answer: "Your data may sync when both devices use the same Apple Account with iCloud enabled. Whether a full-device transfer or backup can restore the data depends on iOS and iCloud conditions." },
      { question: "How do the AI features work?", answer: "On supported devices, Hirame uses Apple's Foundation Models framework and the on-device Apple Intelligence model to expand ideas, review them, suggest questions and next steps, and provide BRIDGE hints and reflections. It may process note text, selected text, text extracted from images or drawings, and game progress. Image and drawing binary data is not passed to the language model. Hirame does not use an AI server operated by Mika Spark Studio or an external LLM API." },
      { question: "How is my purchase status managed?", answer: "Ad-Free is a one-time in-app purchase. Apple StoreKit handles purchases and restoration, and Hirame checks the entitlement verified by Apple. A cached result is also stored temporarily on the device. Check the purchase screen for the current price." },
      { question: "Does Hirame show ads?", answer: "In the free version, you can choose to watch a rewarded ad to temporarily raise the text limit or add an image or drawing. Ads are not shown after you purchase Ad-Free." },
    ],
    troubleshooting: "If you encounter a problem, update Hirame and iOS, then restart your device. If the issue continues, include the following details when you contact support.",
    contactDetails: "Please include your device model, iOS version, Hirame version, the action that caused the issue, and what appeared on screen. Do not send Idea Note text or other personal information unless it is necessary.",
  },
} as const;

export const privacySections: readonly LegalSection[] = [
  { title: "1. Operator", paragraphs: ["Hirame is operated by Mika Spark Studio, an independent development brand."] },
  { title: "2. Data Stored by the App", paragraphs: ["Hirame does not require account registration. To provide its features, the app stores the following data in its local app container:", "Hirame does not include a feature that stores or sends Idea Notes, images, or drawings to a server operated by Mika Spark Studio."], items: ["Idea Note titles, text, themes, idea methods, generated constraints, favorites, and creation or modification dates", "Images and drawings added to notes, plus text extracted from those images or drawings", "Idea-training data such as BRIDGE play history, paths, evaluations, and reflections", "App settings such as onboarding progress, language, usage counts, temporary ad-based unlocks, cached purchase entitlement results, and sync status"] },
  { title: "3. Information Not Collected or Required; Support Inquiries", paragraphs: ["If you contact support, Mika Spark Studio may receive information you choose to provide, such as your email address, inquiry details, device model, OS version, and app version, to the extent needed to investigate the issue. Hirame does not require you to register your name, address, telephone number, or contacts in order to use the app."] },
  { title: "4. Usage, Analytics, and Advertising Information", paragraphs: ["Hirame uses Firebase Analytics to improve quality. It records events such as app launches; use of idea methods, BRIDGE, Library, and AI assistance; saving a note; requesting or completing a rewarded ad; and viewing or completing the Ad-Free purchase flow. Custom analytics events configured by Mika Spark Studio do not include note titles, note text, images, or drawings. Firebase Analytics may automatically collect app usage, device, and app information. The default permission for Firebase Analytics signals used for ad personalization is disabled.", "The free version uses the Google Mobile Ads SDK (AdMob). Google may collect information such as approximate location inferred from an IP address, device identifiers, advertising data, usage data, and diagnostic information."] },
  { title: "5. Purposes of Use", items: ["Providing Idea Notes, idea training, AI assistance, syncing, and other app features", "Understanding usage, investigating defects, and improving quality and functionality", "Displaying rewarded ads and temporarily unlocking features after an ad is viewed", "Processing in-app purchases and checking or restoring purchase entitlements", "Responding to support inquiries and communicating important app or support changes"] },
  { title: "6. On-Device Processing", paragraphs: ["Notes and related data are stored using SwiftData and the app's local settings storage. Hirame uses Apple's Vision framework to extract text from images or drawings and may save that extracted text as note data. Mika Spark Studio does not directly access note content stored on your device."] },
  { title: "7. iCloud and CloudKit", paragraphs: ["When iCloud is available, Hirame uses an Apple CloudKit private database to store and sync SwiftData content—including Idea Notes, images, drawings, and idea-training history—across devices associated with the same Apple Account. This data is not stored on a server operated by Mika Spark Studio.", "If iCloud or CloudKit is unavailable, Hirame falls back to local storage. The app does not include a separate switch for sync; iCloud access can be managed in the device settings. Apple's terms and privacy policy apply to iCloud."] },
  { title: "8. AI Assistance", paragraphs: ["Some AI assistance features use Apple's Foundation Models framework and SystemLanguageModel. When Apple Intelligence is available on a supported device, the on-device model can expand ideas, review them, suggest questions and next steps, and provide BRIDGE hints and reflections.", "The model may process note titles, note text, selected text, descriptions or text extracted from images and drawings, and BRIDGE data such as the START word, GOAL word, path, and candidate words. The current implementation does not pass image or drawing binary data to the language model. It does not invoke Private Cloud Compute, call external LLM APIs such as OpenAI or Anthropic, or send data to an AI server operated by Mika Spark Studio."] },
  { title: "9. Advertising", paragraphs: ["In the free version, a rewarded ad is shown only when you choose to temporarily raise the text limit or unlock the ability to add an image or drawing. Ads are not shown to users who have purchased Ad-Free. Google's terms and privacy policy apply to ad delivery and related data handling."] },
  { title: "10. In-App Purchases", paragraphs: ["Hirame offers Ad-Free as a one-time purchase that removes ads and raises usage limits. The price is shown on the purchase screen. Apple StoreKit processes payment and verifies or restores the purchase entitlement, and purchase information is sent to Apple. Mika Spark Studio does not directly receive credit card or other payment details. Hirame checks the entitlement verified by Apple and temporarily caches the result on the device."] },
  { title: "11. Third-Party Services", paragraphs: ["Hirame currently does not use Crashlytics, an API operated by Mika Spark Studio, or an external LLM API."], items: ["Apple iCloud and CloudKit: data storage and syncing", "Apple Foundation Models and Vision: AI assistance and text extraction", "Apple StoreKit: in-app purchases and entitlement verification", "Google Firebase Analytics: usage analytics", "Google AdMob: ad delivery"] },
  { title: "12. Data Retention", paragraphs: ["Local data is generally retained until you delete it within Hirame or remove the app from your device. Data synced to iCloud is handled according to your actions, iCloud settings, and Apple's retention practices. Analytics and advertising data are handled according to each service provider's policies. Information received through support inquiries is retained only as long as reasonably necessary for support and recordkeeping, then deleted appropriately."] },
  { title: "13. Data Deletion", paragraphs: ["You can use Hirame's in-app deletion option to remove Idea Notes, images, drawings, and idea-training history. When iCloud sync is active, the deletion is synced to iCloud. Deleting the app normally removes local data, but data already synced to iCloud or included in an OS backup may remain. The one-time purchase entitlement is associated with your Apple Account and is not removed when you delete app data.", "To request deletion of information held by Mika Spark Studio as part of a support inquiry, contact the address below."] },
  { title: "14. Security", paragraphs: ["Mika Spark Studio takes reasonable measures, within the scope of an independent development operation, to help prevent loss, leakage, or alteration of information it handles. No method of electronic storage or transmission can be guaranteed to be completely secure."] },
  { title: "15. Use by Minors", paragraphs: ["Minors should use Hirame with parental consent or supervision where appropriate. If applicable law requires parental consent before information is submitted, obtain that consent first."] },
  { title: "16. Changes to This Policy", paragraphs: ["This Privacy Policy may be updated to reflect changes to Hirame, third-party services, or applicable law. Material changes will be announced on this page or in the app where appropriate. The revised policy takes effect when posted here unless otherwise stated."] },
  { title: "17. Operator Information" },
];

export const termsSections: readonly LegalSection[] = [
  { title: "1. Scope", paragraphs: ["These Terms of Use apply between each user and Mika Spark Studio in connection with Hirame. By downloading or using the app, you confirm that you have reviewed and agreed to these Terms."] },
  { title: "2. Conditions of Use", paragraphs: ["You are responsible for providing, at your own cost, the device, network connection, Apple ID, and other environment required to use Hirame. Minors should obtain parental consent where appropriate."] },
  { title: "3. Prohibited Conduct", paragraphs: ["You must not engage in any of the following conduct when using Hirame:"], items: ["Violating applicable law or public order and morals", "Infringing the rights or interests of Mika Spark Studio or any third party", "Intentionally exploiting a defect in the app or interfering with its operation", "Improperly analyzing, modifying, copying, or redistributing the app, except where permitted by law", "Any other conduct reasonably determined by Mika Spark Studio to be inappropriate"] },
  { title: "4. Intellectual Property", paragraphs: ["All intellectual property rights in the software, design, text, images, names, and other content that make up Hirame belong to Mika Spark Studio or the applicable rights holders. These Terms do not grant any right beyond a personal, non-exclusive right to use the app."] },
  { title: "5. User-Created Content", paragraphs: ["Rights in Idea Notes, images, drawings, and other content you create in Hirame remain with you or the applicable rights holder. Mika Spark Studio does not store this content on its own server or directly access or view it. You are responsible for ensuring that content you create or record does not infringe any third-party rights."] },
  { title: "6. Data Storage", paragraphs: ["Hirame stores app data on your device and, when iCloud is available, syncs it through an Apple CloudKit private database. If iCloud is unavailable, Hirame falls back to local storage. You are responsible for managing your data as needed. Data may be lost due to device failure or loss, in-app deletion, iCloud or OS conditions, or other circumstances. Mika Spark Studio does not guarantee permanent storage or recovery of data."] },
  { title: "7. Changes to the Service", paragraphs: ["Mika Spark Studio may change Hirame's content or specifications for quality, functional, technical, or operational reasons. Where a change has a significant impact, notice will be provided before or after the change where reasonably possible."] },
  { title: "8. Suspension or Termination", paragraphs: ["Mika Spark Studio may suspend or discontinue all or part of Hirame when necessary because of maintenance, failures, disasters, changes to an external platform, or other unavoidable circumstances. Where reasonably possible, advance notice will be provided before discontinuation."] },
  { title: "9. Disclaimer", paragraphs: ["Mika Spark Studio does not warrant that Hirame will always operate without interruption or error, meet a particular purpose, or be available on every device. No result is guaranteed from idea training, and the feasibility or usefulness of ideas recorded in the app is not guaranteed."] },
  { title: "10. Limitation of Liability", paragraphs: ["If you suffer damage for reasons attributable to Mika Spark Studio, its liability is limited to the extent permitted by applicable law. This limitation does not apply where it is prohibited by Japan's Consumer Contract Act or other applicable law, including cases of intent or gross negligence."] },
  { title: "11. AI Assistance", paragraphs: ["On supported devices, Hirame provides AI assistance using Apple's Foundation Models framework. AI suggestions, reviews, questions, next steps, BRIDGE hints, and reflections are not guaranteed to be accurate, complete, useful, or suitable for a particular purpose. You are responsible for reviewing and using AI output at your own discretion. AI assistance may be unavailable depending on the device, OS, language, Apple Intelligence settings, or model status."] },
  { title: "12. In-App Purchases", paragraphs: ["Hirame offers Ad-Free as a one-time purchase that removes ads and raises usage limits. The price, included features, and purchase conditions are shown on the purchase screen. Payment, entitlement verification or restoration, and refunds are generally governed by Apple's terms and procedures. A completed purchase may take time to appear because of network conditions or Apple service availability."] },
  { title: "13. Advertising", paragraphs: ["In the free version, a Google AdMob rewarded ad is shown when you choose to temporarily raise the text limit or unlock the ability to add an image or drawing. Google's terms and privacy policy apply to ad delivery. Ads are not shown after you purchase Ad-Free."] },
  { title: "14. Third-Party Services", paragraphs: ["Hirame uses third-party services and frameworks including CloudKit, Foundation Models, StoreKit, Firebase Analytics, and Google AdMob. Some features may become unavailable because of service conditions, outages, or specification changes. See the Privacy Policy for information about the handling of user data."] },
  { title: "15. Changes to These Terms", paragraphs: ["Mika Spark Studio may update these Terms when reasonably necessary because of changes to applicable law, app functionality, or other circumstances. Material changes will be announced on this page or in the app where appropriate. Revised Terms take effect when posted here or on another date stated in the notice."] },
  { title: "16. Governing Law and Jurisdiction", paragraphs: ["These Terms are governed by the laws of Japan. If a dispute concerning Hirame arises, the parties will first attempt to resolve it in good faith. If it cannot be resolved, the court with jurisdiction will be determined in accordance with Japanese law."] },
  { title: "17. Operator Information" },
];
