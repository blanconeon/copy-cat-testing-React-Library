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