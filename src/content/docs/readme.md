---
title: Using this site
description: How to use this Astro site
---

There are two ways that you can edit this website’s content:

- **WordPress**: Most of the homepage, posts, and subpages pull their content directly from your WordPress dashboard. This means you can change content easily without having to go under the hood.
- **Astro (via GitHub)**: Some of the text and images are hardcoded into the site design. Changing this content requires a little knowledge of using GitHub (where the code is stored) and HTML to make the edits.

---

## Making changes to the homepage

Here are each of the homepage sections and how you can customise them. I'll flag what can be changed in WordPress and what needs editing in code.

### Introduction

- **Title**: Hardcoded in Astro. You can change it from the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) page:

```
// index.astro
  <Header title="Adam Koszary" />
```

- **Subtitle**: You can change this by editing the content of the Pitch page on WordPress.

### What I do

- **Title**: Hardcoded in Astro. You can change it from the [index.astro](https://github.com/joevaugh4n/adamkoszary/blob/main/src/pages/index.astro) page:

```
// index.astro
<Services title="What I do" />
```

- **Opening paragraph**: You can change this by editing the the opening paragraph of the Services page on WordPress. Ensure you begin this section with `<p id='introduction'>` and close it with `</p>`. This tells the code to treat the line differently to the services, which make up the rest of the page.

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
- **Hero image**: Hardcoded in Astro. Reach out to Joe and I can change it for you. Alternatively, you can change it in the code in two steps (from the same `index.astro` page as above). First, save your new image to `src/images`. Then, change the image import link at the top of `index.astro` to the new file destination.

```
// index.astro

// Imports for the different components used by the page
import Contact from "../components/Contact.astro";
import Header from "../components/Header.astro";
import HR from "../components/atoms/HR.astro";
import Layout from "../layouts/Layout.astro";
import Posts from "../components/Posts.astro";
import Principles from "../components/Principles.astro";
import Services from "../components/Services.astro";
import Testimonials from "../components/Testimonials.astro";

// Import for the Principles section's hero image. To use a different image, edit the file name below
import HeroImage from "../../src/images/adam_phones.webp";

[... rest of file]
```

### Previous clients

- **Title**: Hardcoded in Astro. You can change it by editing the title property of the `PreviousClients` component in `index.astro`:

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

- **Title**: Hardcoded in Astro. You can edit this from `index.astro`.
- **Description**: Hardcoded in Astro. You can edit this from `index.astro`.

```
// index.astro
<Contact
  description="Chatting to me is  free, and I have a discount for smaller organisations (less than £100k annual revenue)."
  title="Get in touch"
/>
```

### Posts

- **Title**: Hardcoded in Astro. Edit in `index.astro`:

```
// index.astro
<Posts title="Posts" />
```

- **Tags**: Automated from WordPress.
- **Posts**: Automated from WordPress.

---

## Making changes to the core layout

### Nav

- **Menu items**: Hardcoded in Astro. You can edit these in `layout.astro`:

```
// layout.astro
<Nav>
  <a href="/#posts" class="ml-3"><Button caption="Posts" /></a>
  <a href="/#contact" class="ml-3"><Button caption="Contact" /></a>
</Nav>
```

### Footer

- **Body**: Hardcoded in Astro. You can edit these in `footer.astro`:

```
//footer.astro
---
interface Props {
  year?: Date;
}

const { year = new Date().getFullYear() } = Astro.props;
---

<footer class="self-end my-8 flex flex-col items-end text-right px-8">
  <p>&copy; Adam Koszary, {year}</p>
  <p>
    Designed by <a href="https://joevaughan.net" class="underline font-semibold"
      >Joe Vaughan</a
    >
  </p>
</footer>
```
