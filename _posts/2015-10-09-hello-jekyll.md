---
layout: post
title: "hello jekyll"
description: "使用jekyll 发布的第一篇博客"
category: jekyll
tags: [jekyll]
---
{% include JB/setup %}

##hello jekyll
这是使用*jekyll*发布的第一篇文章。
以前使用过*wordpress*，坚持写了一年多的博客，后来更新越来越少了，直到最后空间过期

之前也想过使用jekyll搭建一个免费的博客，看了网上的教程，实在过于复杂，觉得有必要吗，我只想纯粹的写作，其他的我不想管太多。后来发现
没有必要从头到尾搭建一个编译平台。直接fork别人的模版，然后修改修改即可。

从头搭建一个编译平台并不困难，尤其对于Ruby开发者来说。在本地安装好*jekyll*可以方便本地调试博客页面。下面是简单的安装步骤：

* 安装ruby
* gem install jekyll

在fork来的模版目录下，运行
{% highlight bash linenos %}
$ jekyll serve
{% endhighlight %}
在浏览器中打开 `http://localhost:4000` 就可以打开博客主页

##jekyll-bootstrap
我之前没有接触过其他模版，使用jekyll－bootstrap完全是巧合，jekyll本来就比较简单，我稍微看了下文档，就开始动手制作自己的Theme，在制作模版的
过程中可以慢慢体会到Jekyll 的原理。折腾了一番后，你会发现它可以如此的简洁.我的模版就是你现在看到的。

制作和改造jekyll模版需要一些基础知识，比如`liquid`,还有jekyll提供的一下接口。大家可以参考一下文档：

* [jekyll 中文文档]{http://jekyll.bootcss.com/docs/home/}
* [jekyll-bootstrap 文档]{http://jekyllbootstrap.com/usage/jekyll-quick-start.html}
* [liquid for Designer]{https://github.com/Shopify/liquid/wiki/Liquid-for-Designers}

如果你喜欢我正在使用的这个模版，你可以[fork me in github]{}.再改造为适合自己的。或者直接开始写作吧

