---
title: Migrating one-time passwords from Authy to Raivo OTP
subtitle: Migrating all of your OTPs from Authy to Raivo OTP in just a few minutes.
description: Swift doesn't support placeholders in UITextView's natively, so here is the proper way to implement a placeholder in a UITextView. You can do it yourself in under 1 minute.
keywords: raivo, authy, migrating, otp, counter, one, time, password, client, native, app, swift, secure, fast, lightweight, token, two, second, factor
date: 2019-08-14 22:40:59
robots: index, follow
---

If you're annoyed by the user experience of OTP apps such as Authy or the Google Authenticator (just like me), then you may find this useful! In my spare time, I developed Raivo OTP ({% customlink "https://apps.apple.com/app/raivo-otp/id1459042137" %}). Raivo OTP is a non-commercial OTP app for iOS, that contains many must-have features like automagic data synchronization, search capabilities and viewing the current *and* previous token (for if you were just a few seconds late with entering that OTP). And most importantly, it's native (developed in Swift 5)!

{% raw %}
<div class="row">
    <div class="col-md-4 text-center">
        <strong>Search quickly with the search button placed under your thumb</strong>
        {% endraw %}{% customlightbox "previews" "preview_left.png" "Raivo OTP home screen (list)" %}{% raw %}
    </div>
    <div class="col-md-4 text-center">
        <strong>To add an OTP, scan a QR-code or enter the details manually</strong>
        {% endraw %}{% customlightbox "previews" "preview_middle.png" "Creating an OTP in Raivo OTP" %}{% raw %}
    </div>
    <div class="col-md-4 text-center">
        <strong>Configure TouchID or FaceID to unlock the app on start</strong>
        {% endraw %}{% customlightbox "previews" "preview_right.png" "The settings screen of Raivo OTP" %}{% raw %}
    </div>
</div>
{% endraw %}

{% raw %}
<hr><div class="text-center"><i>
{% endraw %}

"Raivo OTP looks great, but how do I migrate? I've got all my OTPs in Authy, but it does not provide me with any export functionality."

{% raw %}
</i></div><hr>
{% endraw %}

Migrating your OTPs isn't easy, especially because vendors don't want you to leave their product or service. Apps like Authy, Google Authenticator, or the Microsoft Authenticator all lack export functionalities.

Luckily, Authy has an extension for Chrome that allows you to view your OTPs in your browser. This extension will enable us to extract the tokens and generate QR-codes, which Raivo OTP can scan. The following guide is based on a GitHub Gist ({% customlink "https://gist.github.com/gboudreau/94bb0c11a6209c82418d01a59d958c93" %}) from the user `gboudreau`, which a colleague of mine found online.

### Migrating

1. Install Authy from the Chrome Web Store ({% customlink "https://chrome.google.com/webstore/detail/authy/gaedmjdfmmahhbjefcbgaolhhanlaolb?hl=en" %}).
2. Open the Authy extension **and sign in** (make sure that the OTPs are visible)
3. Go to the extensions page in Chrome (`chrome://extensions/` or Menu > More tools > Extensions)
4. Enable developer mode in the top right corner
5. Find Authy from the list and then click on `main.html`
6. The Chrome developer console should now open.
7. Paste the JavaScript (at the bottom of this page) into your console.
8. You'll now see QR-codes that you'll be able to scan using Raivo OTP!
9. When done, close the developer tools, disable developer mode, and uninstall the Authy extension.

{% raw %}
<br>
{% endraw %}

{% highlightcodefromurl javascript "https://gist.githubusercontent.com/tijme/2bda5ca110de23d4ef74bbf69e8c98c9/raw/migrating_authy_to_raivo_otp.js" %}
