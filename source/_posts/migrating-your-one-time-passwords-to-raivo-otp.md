---
title: Migrating your one-time passwords to Raivo OTP
subtitle: Migrating all of your one-time passwords to Raivo OTP in just a few minutes.
description: Many one-time password (OTP) apps do not allow you to migrate your OTPs to other apps. This blog post contains fancy tricks that enable you to export these OTPs anyway.
keywords: raivo, migrating, export, otp, counter, one, time, password, client, native, app, swift, secure, fast, lightweight, token, two, second, factor
date: 2019-08-16 23:41:27
robots: index, follow
show_in_home: true
---

If you're annoyed by the user experience of OTP apps such as Authy or the Google Authenticator (just like me), then you may find this useful! In my spare time, I developed Raivo OTP ({% customlink "https://apps.apple.com/app/raivo-otp/id1459042137" %}). Raivo OTP is a non-commercial OTP app for iOS, that contains many must-have features like automagic data synchronization, search capabilities and viewing the current *and* previous token. Most importantly, Raivo OTP is native (developed in Swift 5) and is therefore very fast!

{% raw %}
<div class="row">
    <div class="col-md-4 text-center">
        {% endraw %}{% customlightbox "previews" "preview_left.png" "Raivo OTP home screen (list)" %}{% raw %}
    </div>
    <div class="col-md-4 text-center hidden-xs hidden-sm">
        {% endraw %}{% customlightbox "previews" "preview_middle.png" "Creating an OTP in Raivo OTP" %}{% raw %}
    </div>
    <div class="col-md-4 text-center hidden-xs hidden-sm">
        {% endraw %}{% customlightbox "previews" "preview_right.png" "The settings screen of Raivo OTP" %}{% raw %}
    </div>
</div>
<br/>
{% endraw %}

One of the features that is lacking in most of the OTP apps (except Raivo OTP 👌) is the possibility to export OTPs. Therefore, migrating OTPs isn't easy. That OTP apps are lacking export functionalities is probably due to the fact that vendors don't want you to leave their product or service. However, during the development of Raivo OTP I found various fancy workarounds that enable you to export OTPs from popular OTP apps. I want to share these to improve the experience of migrating to Raivo OTP.

The following blog posts are guides that walk you through the process of exporting your OTPs and importing them into Raivo OTP.

* [Migrating from Authy to Raivo OTP](/blog/migrating-your-one-time-passwords-from-authy-to-raivo-otp/)
* Migrating from Google Authenticator to Raivo OTP (**coming soon**)
