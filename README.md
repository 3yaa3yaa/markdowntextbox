# MarkdownTextBox
This is a react component of markdown text box.
This software is released under the MIT License, see LICENSE.txt.

## How to use
```$xslt

import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
...
render()
{
    return <MarkdownTextBox value={textdata}
                     reservedItems={ArrayOfAnyReservedCharacter}
                     onChange={(e)=>this.onChangeHandler(e)}
                     focus=true //or false
                     textAreaStyle={{height:"500px",fontFamily:"sans-serif", fontSize:"100%"}} //Custom style for textarea
                      />
}

```

## What's "Reserved" items?
You can add custom behaviour to a certain reserved character.
Create an array of objects that has following elements and pass it to `<MarkDownTextBox reservedItems={here}/>`
```$xslt
 class Reserved
{
    constructor(keyword, stopwords, behaviour, description)
    {
        this.keyword　=　keyword;  //string
        this.stopwords　=　stopwords; //string array
        this.behaviour　=　behaviour; //callback that receives an item that is surrounded by keyword and stopword
        this.description = description; //breaf explanation of this item
    }
}
```
You can get the above class by importing this library as below.
```$xslt
import { Reserved } from '@3yaa3yaa/markdowntextbox'
```
For example,
* keyword : `#`
* stopwords : `["", "\n"]`
* behaviour : `(node)=>{return <strong>{node}</strong>}`

and you got a text "aaa #bbb ccc"
Then you will get "aaa **bbb** ccc"

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
