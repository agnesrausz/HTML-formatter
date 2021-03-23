# HTML formatter

## Story

You are working at the military as part of a web developer team
responsible for creating various web applications for inner usage. Your boss,
Major Issue thinks that an [HTML formatter](https://htmlformatter.com/) would
boost the team's performance, however, he doesn't want you to use any 3rd party
applications as you are working with confidential data and imported code
is considered to be a security risk for the army.

Your job is to develop a simple HTML/JavaScript page that can do the trick.

It should work like this:

![HTML formatter solution animgif](media/web/html-formatter-solution.gif)

## What are you going to learn?

You will learn and practice how to use the following things:

- DOM manipulation using JavaScript,
- regular expressions,
- the stack data structure,
- algorithmic thinking.

## Tasks

1. Implement the indentation feature: after clicking the `Format` button, the HTML code written in the `#source` textarea should appear in the `#target` div with proper indentation.
    - Clicking the `Format` button copies all the text from the textarea on the left side to the target div on the right side
    - Attributes on valid HTML elements are kept, i.e. `<link rel="stylesheet" type="text/css" href="theme.css">`
    - Every opening (or single) tag appears in a new line. The text content of the element (the raw text between the tags) are displayed right after the opening tag (e.g. `<p>Lorem ipsum dolor...`
    - Every child tag is indented with 4 more spaces than its parent tag
    - Closing tags appear in the line as the opening in case
the element has no children elements, only textual content, i. e.
`<p>Lorem ipsum</p>`
    - When the element has children elements,
its closing tag appear in a new line, like `/ul` and `/p` here:
```
<ul>
    <li>One</li>
    <li>One</li>
</ul>```
or
```
<p>Lorem ipsum
    <em>dolor</em>
    <em>sit amet</em>
</p>```
    - When the element has textual content _after_ a child element,
the text is displayed on the same level as the children,
and the parent closing tag appears in a new line:
```
<p>Lorem ipsum
    <em>dolor</em>
    sit amet !!!
</p>```
    - There is no extra whitespace between tags and text nodes (e.g. **not** like this: `<h1>text node         </h1>`)
    - There are no extra whitespace between rows

2. Implement the validity checker feature: the program should show an error if invalid or unknown tags are found in the source code.
    - Only the following tags are allowed here: `html`, `head`, `meta`, `title`, `script`, `link`, `body`, `div`, `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `a`, `br`, `strong`, `em`, `span`, `code`, `table`, `tr`, `td`, `form`, `button`, `input`, `option`, `select`, `textarea`
    - If there is an invalid tag in the source code, clicking the `Format` button results in the following error message displayed in the target div: `Not valid HTML! Unknown tag: <invalid tag name>` where the actual invalid tag name is shown

3. Improve further the validity checker feature: the program should show an error if regular (paired) tags are not properly nested (i.e. missing opening or closing tags, or wrong closing order like this one: `<h1><p></h1></p>`).
    - Only properly nested regular (paired) tags are allowed
    - If there are orphaned regular tags or invalid nesting in the source code, clicking the `Format` button results in the following error message displayed in the target div: `Not valid HTML! No pair for <orphaned tag>!`

4. Implement separate colors for separate HTML roles: tags should be green, attribute keys blue, attribute values red, and textual content black.
    - Every tag along with the angle brackets (`<>`) and the slash (`/`) should appear in green in the target div
    - Every attribute along with the equal sign (`=`) should appear in blue in the target div
    - Every attribute value along with the quotation marks (`""`) should appear in red in the target div
    - Every text node should appear in black in the target div

5. Implement the tag highlighting feature: moving the mouse over a tag should highlight also its distant parts.
    - Moving the mouse over on a tag part (angle brackets, slash, or name) in the target div on the right side results in the all tag parts highlighted
    - Moving the mouse over on an attribute part (key or value) no highlight appears
    - Moving the mouse over on a tag part (angle brackets, slash, or name) in the target div on the right side results in a highlighted pair tag (if exists), i.e. hovering `</div>` highlights the corresponding `<div>`

## General requirements

None

## Hints

- You can use the contents of `test.html` for testing your program.
- Use a JavaScript array as a _stack_ (using its `push` and `pop` methods only)
  for keeping track of tag pairs.
- Use JavaScript's `matchAll` function with regular expressions to match tags,
  attributes and values.
    - It is advised to use a regular expression tester site to test and improve your
      regular expression.
- About regular expressions: it's a tough topic and needs practice. Make sure
  you understand at least the following concepts:
    - regex patterns,
    - regex options or flags,
    - greedy / lazy matching,
    - capturing groups.
- You may face problems upon creating event handler functions for dynamically
  created elements - try reading about scopes and closures in this context.

## Background materials

- <i class="far fa-exclamation"></i> [Anatomy of an HTML element](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- <i class="far fa-exclamation"></i> [About the stack data structure](project/curriculum/materials/competencies/data-structures-basics/stack.md.html)
- <i class="far fa-exclamation"></i> [DOM manipulation](project/curriculum/materials/pages/javascript/javascript-dom.md)
- <i class="far fa-exclamation"></i> [About regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions)
- <i class="far fa-book-open"></i> [Regular expression tutorial](https://regexone.com/)
- <i class="far fa-book-open"></i> [Regular expression tester site](https://regex101.com/)
- <i class="far fa-book-open"></i> [About adding dynamical element with event listeners](https://itnext.io/javascript-event-listeners-delegation-vs-closures-8fe52ac49872)
