---
title: Using this site
description: How to use this Astro site
---

There are two ways that you can edit this website’s content:

- **WordPress**: Most of the homepage, posts, and subpages pull their content directly from your WordPress dashboard. This means you can change content easily without having to go under the hood.
- **Astro (via GitHub)**: Some of the text and images are hardcoded into the site design. Changing this content requires a little knowledge of using GitHub (where the code is stored) and HTML to make the edits.

## Making changes to the homepage
Here are each of the homepage sections. I'll flag what you can change in WordPress and what you'd need to change in Astro.

### Introduction

- **Title**: Hardcoded in Astro.
- **Description**: Edit the content of the Pitch page on WordPress.

### What I do

This section connects to the Services page (`/services`). All content syncs to WordPress, but there are a few things to keep in mind:

- **Opening paragraph**: Make sure you begin the opening paragraph with `<p id='introduction'>` and close it with `</p>`. This instructs the code to treat the line as the introduction, rather than as one of the collapsible items. For example:

```
<p id='intro'>I can help make people actually like you and follow you online.</p>
```

- **Individual service drawers**: The code creates the collapsible items from individual `<li>` tag within a `<ul>` list. For example:

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

When the code parses the list, it takes the text before the colon as the item title (`service.name`) and the text after the colon as the item description (`service.description`):

```
// Services.astro
<Drawer title={service.name}>
  <p>{service.description}</p>
  {service.name.toLowerCase().includes("keith") && (
    <img
      src={Keith.src}
      alt="Keith, a fox terrier"
      title="Keith, a fox terrier"
      class="rounded-sm"
    />
  )}
</Drawer>
```

 ...and there is a custom rule for when the service title mentions Keith!

### How I can help

This section connects to the Principles page (`/principles`). You can customise all the text directly from WordPress: the title is the page title, the content is the page content. Currently, you can't change the image without going under the hood and editing the Astro file. For now, if you need any changes there, reach out to Joe.

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
