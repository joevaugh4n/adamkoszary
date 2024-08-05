---
title: Using this site
description: How to use this Astro site
---

An explanation of how this site works, how it's maintained, and how you can introduce changes (to either the frontend or the backend).

## Backend: WordPress

You can customise the majority of the homepage content directly from Wordpress. The site uses WordPress as a backend data source. Here's how the different parts of the homepage connect to WordPress pages.

#### Section 1: Introduction

This section connects to the Pitch page (`/pitch`). The title ('Adam Koszary') is hardcoded, but you can change the subtitle.

#### Section 2: What I do

This section connects to the Services page (`/services`). All content is synced from WordPress.

- _Opening paragraph_: The API uses a custom `<p id='introduction'>` tag on WordPress to parse this section. If you change this text, ensure you wrap it with the same HTML `<p>` tag, like so:

```
<p id='intro'>I can help make people actually like you and follow you online.</p>
```

- _Individual service drawers_: The API creates the drawers from each individual `<li>` tag within the `<ul>` list. It defines the title from the section before the colon, and selects the description from what's after the colon. To make a new drawer, simply create a new `<li>` line. There is also custom logic for the picture of Keith in the Keith tag (it detects Keith's name and then displays the drawer differently).

```
<ul>
    <li>Social media and content strategy: I can help turn your hopes, dreams and challenges into content pillars, action plans and processes to give your organisation clarity, purpose and enthusiasm.</li>
    <li>Content audit: I can look under the hood of your content and website to pinpoint what needs improving and how.</li>
    <li>Training and workshops: I provide practical sessions on content creation - from ideation to reporting - as well as inspirational talks that will fire up your staff for the possibilities of social media and content.</li>
    <li>Critical friend: For when you need someone to sense-check a campaign or strategy, be a sounding board for new projects or to have a quiet word with senior management.</li>
    <li>Content production: I can help you figure out what content to post, when and who for - as well as write the posts, create the imagery and shoot the video.</li>
    <li>Keith: On request, I will send you pictures of my fox terrier until you tell me to stop.</li>
</ul>
```

#### Section 3: How I can help

This section connects to the Principles page (`/principles`). You can customise all the text directly from WordPress (the title is the page title, the content is the page content). The only thing that's hardcoded is the image. If you want to change that, just reach out to Joe for now.

### Section 4: Previous clients

This section consists of two components, joined together: one for logos, one for testimonials. The logos are hardcoded. Testimonials can be created and edited from WordPress.

## Frontend: Astro

The frontend for this site is created with [Astro](https://astro.build/), a modern web development language that enables developers to ship great websites that prioritise interactivity _and_ performance. Astro does this by minimising the amount of JavaScript--the language that makes websites interactive--shipped to the end user's browser, which is really heavy on the juice. Instead, Astro optimises websites to be mostly pure HTML and CSS, building lean and performant websites without sacrificing quality.

Astro's scripting language revolves around `.astro` files. These files use a syntax that's much like another very popular scripting language known as `JSX`, which combines HTML and JavaScript. For example, a `.astro` file looks like this:

```

// Button.astro
---
interface Props {
  // The button title
  caption: string;
  font?: 'mono' | 'handwriting';
}

const { caption, font='mono'} = Astro.props;
---

<button
  class=`text-black rounded-lg w-fit px-4 h-12 ${font=='mono'? 'font-mono' : 'font-handwriting'} bg-slate-200 hover:bg-black dark:hover:bg-slate-500 hover:text-white tracking-tight`
>
  {caption}
</button>


```

In this code:

- The section between `---` and `---` is known as frontmatter. In here, you can add custom JavaScript code and define the properties that your [component](https://docs.astro.build/en/basics/astro-components/) will use. The ability to create a component and then reuse it with customised properties is really significant, because it lets you build a button once and then reuse it with custom properties as many times as you like, never having to start from scratch.
- The section after the `---` is mostly HTML with inline CSS, using another framework named [Tailwind CSS](https://blog.hubspot.com/website/what-is-tailwind-css). The places in which there are curly braces (`{}`) signify the properties that you can customise. In this case, you can reuse the Button wherever you like, and each time you'll need to specify the caption/label. When you go to reuse the button component in another place, the button will look like this:

```
// Any .astro file in which you're using the button component
<Button caption="Posts" />
```
