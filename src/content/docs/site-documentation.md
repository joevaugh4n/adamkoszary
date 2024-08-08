---
title: Using this site
description: How to use this Astro site
---

_Last updated: 8/8/2024_

There are two ways you can edit this website’s content:

- **WordPress**: Most of the homepage, posts, and subpages pull all their content from your WordPress dashboard. This means you can change content without having to go under the hood (aka open a code editor).
- **Astro (via GitHub)**: Some of the text and images are hardcoded into the site design, which is built using a framework called [Astro](https://astro.build/). Astro development involves building components (like the LEGO bricks that make up a site) and then using them throughout different pages and layouts. The good news is that Astro components (once created) use a very similar same syntax to HTML, so making changes to them won't be too inaccessible at all. The Astro code lives in [a GitHub repository](https://github.com/joevaugh4n/adamkoszary), which you can make changes to. Alternatively, I'm always happy to help.

Next, I'll go through each of the homepage sections and highlight how you can change and update the content. I'll indicate whether those changes can be made on WordPress or if they need to happen within the Astro code.

---

## Homepage updates

### Header

- **Title**: Hardcoded in Astro. You can change it from the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) file:

```
// index.astro
  <Header title="Adam Koszary">
```

- **Subtitle**: You can change this by editing the content of the Pitch page on WordPress.

- **Social media icons**: Hardcoded in Astro. You can update the icons or add new icons by editing the `<SocialIcon>` components within the `<Header>` component. `<SocialIcon>` contains properties for the icon's `title` (hover text), `url` (link) and `name` (the image itself) Note: all the icons are from [the Tabler Icon Library](https://icon-sets.iconify.design/tabler/) (e.g. 'tabler:brand-x', 'tabler:brand-linkedin).

```
//index.astro
  <Header title="Adam Koszary">

    <!-- The Twitter icon>
    <SocialIcon
      title="Twitter"
      url="https://x.com/AdamKoszary"
      name="tabler:brand-x"
    />

    <!-- The LinkedIn icon>
    <SocialIcon
      title="Linkedn"
      name="tabler:brand-Linkedin"
      url="https://linkedin.com/in/adam-koszary"
    />

  </Header>
```

### What I do

- **Title**: Hardcoded in Astro. You can change it from the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) file:

```
// index.astro
<Services title="What I do" />
```

- **Opening paragraph**: You can change this by editing the the opening paragraph of the Services page on WordPress. Ensure you begin this section with `<p id='introduction'>` and close it with `</p>`. This custom `<p>` tag tells the code to treat the line differently to the service items.

- **Individual services**: You can change these by editing the the list entries on the Services page. Put the title before a colon, and the description after it. There is also a custom rule for any item that uses Keith as the title!

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

### How I can help

- **Title**: You can change this by editing the the title of the Principles page.
- **Body**: You can change this by editing the body of the Principles page.
- **Hero image**: Hardcoded in Astro. You can change it from the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) file. First, add your new image to the `src/images` directory. Then, update the file import for `PrinciplesImage`. This will set your new image as the hero image for the Principles section.

```
// index.astro

[... other imports]

// Import for the Principles section's hero image. To use a different image, edit the file name below.
import PrinciplesImage from "../../src/images/adam_phones.webp";

[... rest of file]
```

### Previous clients

- **Title**: Hardcoded in Astro. You can change it by updating the `title` property of the `<PreviousClients>` component in the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) file.

```
// index.astro
<PreviousClients title="Previous clients" />
```

- **Logos**: Hardcoded in Astro, but you can add new ones in three steps. First, save your new logo image to `src/images` (ideally as a .svg file or as a .webp file alternatively). Then, import the new image to `index.astro`:

```
// index.astro

// Imports for the logo images. If you're adding a new logo, you can give it any alias (e.g. 'Bletchley Park' could have been 'Bletch Park', 'BP', etc). Just make sure you refer to the same alias when creating the Logo component.

import BletchleyPark from "../../src/images/bp.svg";
import BM from "../../src/images/bm.svg";
import GoodLawProject from "../../src/images/goodlawproject.svg";
import HistoricEngland from "../../src/images/historicengland.svg";
import LondonArtStudies from "../../src/images/londonartstudies.webp";
import MuseumsAssociation from "../../src/images/museumsassociation.svg";
import MuseumsGalleriesEdinburgh from "../../src/images/museumsgalleriesedinburgh.webp";
import TripleC from "../../src/images/triplec.webp";

[... rest of code]
```

Finally, within the `PreviousClients` component, create a new `Logo` component. Add the relevant properties for `org` (name), `logoImage`, and `url` (website):

```
// index.astro
<PreviousClients title="Previous clients">
  <Logo
    org="British Museum"
    logoImage={BM}
    url="https://www.britishmuseum.org/"
  />
  <Logo
    org="Historic England"
    logoImage={HistoricEngland}
    url="https://historicengland.org.uk/"
  />
  <Logo
    org="Good Law Project"
    logoImage={GoodLawProject}
    url="https://goodlawproject.org/"
  />
  <Logo
    org="Museums Association"
    logoImage={MuseumsAssociation}
    url="https://www.museumsassociation.org/"
  />
  <Logo
    org="Bletchley Park"
    logoImage={BletchleyPark}
    url="https://bletchleypark.org.uk/"
  />
  <Logo
    org="Triple C"
    logoImage={TripleC}
    url="https://triplec.org.uk/"
  />
  <Logo
    org="London Art Studies"
    logoImage={LondonArtStudies}
    url="https://londonartstudies.com/"
  />
  <Logo
    org="Museums & Galleries Edinburgh"
    logoImage={MuseumsGalleriesEdinburgh}
    url="https://www.edinburghmuseums.org.uk/"
  />
</PreviousClients>
```

### Contact form

- Both the title and description can be updated by changing the `title` and `description` properties of the `<ContactForm>` component in [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro).

```
// index.astro
<Contact
  description="Chatting to me is  free, and I have a discount for smaller organisations (less than £100k annual revenue)."
  title="Get in touch"
/>
```

### Posts

- **Title**: Hardcoded in Astro. Edit by changing the `title` property of the `<Posts` component in [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro):

```
// index.astro
<Posts title="Posts" />
```

- **Tags**: Automated from WordPress.
- **Posts**: Automated from WordPress.

---

## Making changes to the core layout

### 'Under construction' banner

To change the site from being live to showing the 'under construction' message, change the `ready` property of the `<Layout>` component in [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro). By default, `ready` is set to true. If you set it to false, the 'under construction' message will show.

```
//index.astro
<Layout
  metaDescription="Adam Koszary is an expert in social media and digital engagement for museums, galleries, libraries, archives, and theatres."
  title="Adam Koszary"
  ready={false /** accepts true or false */}
>
```

### Site navigation

- **Menu items**: Hardcoded in Astro. You can edit these by changing the `<NavLink>` components within [layout.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/layouts/Layout.astro) or by adding new `<NavLink>` components. Each `<NavLink>` requires properties for `url` (the link, which currently are anchor links to different parts of the homepage) and `caption` (button text).

```

// layout.astro
<Nav>
<NavLink url="/#posts" caption="Posts" />
<NavLink url="/#contact" caption="Contact" />
</Nav>

```

### Footer

- **Body**: Hardcoded in Astro. You can edit these in the [footer.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/components/Footer.astro) file.

```

## //footer.astro

interface Props {
year?: Date;
}

## const { year = new Date().getFullYear() } = Astro.props;

<footer class="self-end my-8 flex flex-col items-end text-right px-8">
  <p>&copy; Adam Koszary, {year}</p>
  <p>
    Designed by <a href="https://joevaughan.net" class="underline font-semibold"
      >Joe Vaughan</a
    >
  </p>
</footer>
```

---

## Adding content

Any posts you add or update on WordPress will directly appear within the live site. It might take 1-2 mins max for the site to rebuild so that the new content appears in the frontend code. If there are any problems here, please reach out to me and I'll be happy to fix it!
