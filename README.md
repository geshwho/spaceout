# README

Just for **_fun_** application that ended up being entirely react, and no ruby/rails, but when I started the idea was to be able to save changes.

## What's fun about it?

Maybe not much 😂, but my wife is an architect and this is what constitutes fun in our household! The application (while incomplete) provides a barebones way to layout an office space with different components (private office, conference room, etc.) while automatically taking into account some "best design practices" like how much clearance is needed between a desk and a wall in order for people to comfortably move about the room.

###Running this:
* I used ruby-2.5.0
* It doesn't work on newer versions of node (I think < 9)
* You should be able to:
  * `bundle install`
  * `yarn install`
  * `rails s`
  
## How does it work?

The **top of the page** consists of 3 sections:
* **Left:**   List of components
* **Middle:** Preview of the component
* **Right:**  Design Parameters that affect the preview
Once you're satisfied with the preview, you can _drag the name_ of the component from the left to the bottom section of the page. The application will drop the component (with some "snap to grid" effects) according to what you have in the design parameters. There is some basic "clash detection" to prevent multple components in the same space.
(Top of Page)[doc/top.png]

The **bottom of the page** is just once big empty box. But it can be populated with components from the top section. Once a component has been dropped in, you can move it around, or resize the `Area` by click and drag. You can create a row of components (like a row of private offices) by expanding the `Area` to be wide enough to accomodate two.

The example image below shows this with two differently designed components, that as a result of the differences fill a different number of components in.
(Bottom of Page)[doc/bottom.png]

## Issues/Incomplete Things

A lot of stuff:
* The conference room component is just a chair.
* Extending the `height` of an `Area` instead of the `width` doesn't do anything. Ideally it should somehow add space for a hallway, and then more of the component
* There's no way to rotate the components
* There's no way to "save" your work, because I never built a backend.
