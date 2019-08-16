---
title: Migrating one-time passwords from Authy to Raivo OTP
subtitle: Migrating all of your OTPs from Authy to Raivo OTP.
description: Authy doesn't allow you to migrate your one-time passwords to other OTP apps. However, the Authy Chrome extension allows everyone to extract the tokens by using the Chrome developer console.
keywords: raivo, authy, migrating, otp, counter, one, time, password, client, native, app, swift, secure, fast, lightweight, token, two, second, factor
date: 2019-08-14 21:10:32
robots: index, follow
show_in_home: false
---

**[Note]** This blog post is part of a series of [migration guides](/blog/migrating-your-one-time-passwords-to-raivo-otp/) that enable you migrate your OTPs from various OTP apps to Raivo OTP.

{% raw %}<hr>{% endraw %}

Authy has an extension for Chrome that allows you to view your OTPs in your browser. This extension will enable you to extract the tokens and generate QR-codes, which Raivo OTP can scan. The following guide is based on a GitHub Gist ({% customlink "https://gist.github.com/gboudreau/94bb0c11a6209c82418d01a59d958c93" %}) from the user `gboudreau`, which a colleague of mine found online.

### Migrating

1. Install Authy from the Chrome Web Store ({% customlink "https://chrome.google.com/webstore/detail/authy/gaedmjdfmmahhbjefcbgaolhhanlaolb?hl=en" %}).
2. Open the Authy extension and sign in (**make sure that the OTPs are visible by clicking on one of them**)
3. Go to the extensions page in Chrome (`chrome://extensions/` or Menu > More tools > Extensions)
4. Enable developer mode in the top right corner
5. Click on the Authy extension and open the `main.html` file
6. The Chrome developer console should now open.
7. Paste the JavaScript (at the bottom of this page) into your console.
8. You'll now see QR-codes that you'll be able to scan using Raivo OTP!
9. When done, close the developer tools, disable developer mode, and uninstall the Authy extension.

{% raw %}
<br>
{% endraw %}

{% highlightcodefromurl javascript "https://gist.githubusercontent.com/tijme/2bda5ca110de23d4ef74bbf69e8c98c9/raw/migrating_authy_to_raivo_otp.js" %}
