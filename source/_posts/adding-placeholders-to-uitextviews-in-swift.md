---
title: Adding a placeholder to a UITextView in Swift
subtitle: The proper way to implement a placeholder in a UITextView in under 1 minute.
description: Swift doesn't support placeholders in UITextView's natively, so here is the proper way to implement a placeholder in a UITextView. You can do it yourself in under 1 minute.
keywords: textview, uitextview, ui, text, view, placeholder, background, grey, help, swift, ios, osx, apple
date: 2016-12-05 14:12:32
---

Swift doesn't support placeholders in UITextView's natively, so here is the proper way to do it yourself in under 1 minute. You can checkout the preview GIF on Twitter ({% customlink "https://twitter.com/finnwea/status/805743064232902656" %})!

* Add `UITextViewPlaceholder.swift` to your project
* Set the placeholder attribute of your `UITextView` (e.g. `textView.placeholder = "Message..."`)

**UITextViewPlaceholder.swift (<a href="https://gist.github.com/tijme/14ec04ef6a175a70dd5a759e7ff0b938" target="_blank" title="Tweet" rel="noopener">GitHub Gist - latest version</a>)**

{% highlightcodefromurl swift "https://gist.githubusercontent.com/tijme/14ec04ef6a175a70dd5a759e7ff0b938/raw/UITextViewPlaceholder.swift" %}
