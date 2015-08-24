# Another Slider That's Not Unique
---
## Why on earth did you make this?
I reached the point that it was just simpler for me to make my own slider. I wanted specific markup and CSS. I also wanted the bare minimum possible for my uses.

## How is it used?
Really simply, because I know what I want from it.

    $(selector).hSlider();

That will start a slider with a 3 second time out that has next, prev selectors and a div of spans for indexing inside it's main div.

    $(selector).hSlider({
      type: 'carousel',
      delay: 8000
      });

This will make you a slider with a 8 second time out that has next, prev selectors and a div of spans for indexing. However this time the index span will be outside the main images div, and the spans will be little versions of the main image.

## What are the options I can pass?
Type is either carousel OR slider. Honestly though anything string passed other than 'carousel' will become a normal slider.

Delay is a simple integer in milliseconds. Any number smaller than 9007199254740991 is cool.

## Why set images as CSS backgrounds?
It's supposed to be used as a full screen slider, so scaling is easier. It's also a deterrent to copying the images for an average user.

## You've got an idea on how to make this better?
I'm super game to hear about it. We can only become better through our peers, so open a PR, create a discussion, slander me. However you want to go about it, just get your thoughts to me!
