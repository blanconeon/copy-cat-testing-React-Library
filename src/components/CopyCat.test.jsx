import { CopyCat } from "./CopyCat";
import React from 'react';
import {render, screen} from '@testing-library/react' 
import { expect } from "vitest";


it("Displays the provided name", () => {
 render(<CopyCat name= {'Mack'} value={""} handleChange={()=> {}} toggleTape={()=>{}} isCopying={true}/>)
//test copy cat header here
const header = screen.getByText("Copy Cat Mack");
expect(header).toHaveTextContent("Copy Cat Mack");
});



it("Should display input text in paragraph when isCopying is set to true", () => {
render(<CopyCat name={"Mack"} value={"Here is an Input"} handleChange={()=>{}} toggleTape={()=>{}} isCopying={true} />); // The props you pass when you render the component in your test are only for that specific test instance. The test is isolated from the real app. so value is not available as value in the actual test below, just in the props. 

// test the simultaneous feedback from textbox to P

// verify that the input value displayed in the textbox is the same as the value props passed to copyCat commponent.
 const inputNode= screen.getByRole("textbox");
 expect(inputNode).toHaveValue("Here is an Input");
 // verify that the rendered P has the text "here is an input"
 const paragraph = screen.getByText("Here is an Input");
 expect(paragraph).toBeInTheDocument(); // toBeInDocument does not accept arguments
});




it("Should not display input text in paragraph when isCopying is set to false", () => {
render(<CopyCat name= {'Mack'} value={"here is another input"} handleChange={()=> {}} toggleTape={()=>{}} isCopying={false}/>);

// verify there is no p set with the text in the input when isCopying is set t false

const inputNode = screen.getByRole("textbox");
expect(inputNode).toHaveValue("here is another input");
// verify that there is no  P with text as the isCopying value is set to false. 
const paragraph = screen.queryByText("here is another input");
expect(paragraph).not.toBeInTheDocument();

});



/* You can test similar behaviors in `CopyCat`, but with a key difference:

- In `CopyCat`, you test how it **renders** based on the props you give it. You control the props directly, so you’re not testing user interaction or state changes—just how the component displays what it receives.
- In `CopyCatContainer`, you test the **full flow**: user interaction, state updates, and how those changes are reflected in the UI. This is closer to how a real user experiences the app.

So, while the outcomes may look similar, the tests serve different purposes. Testing both ensures each part works on its own and together.

In presentational component tests, you control the component by passing props directly. You don’t use userEvent because presentational components don’t manage their own state—they just display what they receive.

userEvent is used in container or parent component tests, where user actions trigger state changes and update the UI. Presentational components are tested by changing props and checking the output.*/