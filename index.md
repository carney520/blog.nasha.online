---
layout: page
title: Home
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
	<!-- list all post -->
	<li class="post-item">
	  <!-- page date -->
		<div class="post-item-date">
		{{post.date | date_to_long_string}}
		</div>

		<!-- page title -->
		<h2><a href="{{BASE_PATH}}{{post.url}}">{{post.title}}</a></h2>

		<!-- page tagline-->
		{% if post.tagline %}
		  <h3>{{post.tagline}}</h3>
		{% endif %}

		<div class="post-excerpt">
		{{post.content | strip_html |truncate:154}}
		</div>
	</li>
  {% endfor %}
</ul>

