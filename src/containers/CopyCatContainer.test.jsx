import { CopyCatContainer } from "./CopyCatContainer";
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react' 
import { expect } from "vitest";
import userEvent from '@testing-library/user-event'


it("Should display copied text", async () => {
render(<CopyCatContainer />);
// grab the textbox
const input = screen.getByRole("textbox");
// testing logic to simulate user interaction. 
await userEvent.type(input, "Hello World");

const paragraph = await screen.findByText("Hello World"); //Rememeber findByText is asyc and getByText is not.. Rmemeber this line is async because it awaits for the text to appear as a consequence of the input above. 
expect(paragraph).toBeInTheDocument();
});




it("Should remove copied text after putting on tape", async () => {
render(<CopyCatContainer />);

// First grabs textbox and then userEvent writes in it
const input = screen.getByRole("textbox");
// testing logic to simulate user interaction. 
await userEvent.type(input, "My mouth is shut");

// then we grab P and ensure the text from previous step has been rendered in a P
const paragraph = await screen.findByText("My mouth is shut"); //Rememeber findByText is asyc and getByText is not.. Rmemeber this line is async because it awaits for the text to appear as a consequence of the input above. 
expect(paragraph).toBeInTheDocument();

// grabs button where img is and mimics click
const imgNode = screen.getByRole("button");
await userEvent.click(imgNode);

//Use wait for and queryByText to await for the P element to be deleted. frist it attemtpts to grab the p  then it confirms it does not exist
  await waitFor(() => {
    const deletedText = screen.queryByText('My mouth is shut');
    expect(deletedText).toBeNull();
  })
});




it("Should display copied text after removing tape", () => {

});








/* You can test similar behaviors in `CopyCat`, but with a key difference:

- In `CopyCat`, you test how it **renders** based on the props you give it. You control the props directly, so you’re not testing user interaction or state changes—just how the component displays what it receives.
- In `CopyCatContainer`, you test the **full flow**: user interaction, state updates, and how those changes are reflected in the UI. This is closer to how a real user experiences the app.

So, while the outcomes may look similar, the tests serve different purposes. Testing both ensures each part works on its own and together.

In presentational component tests, you control the component by passing props directly. You don’t use userEvent because presentational components don’t manage their own state—they just display what they receive.

userEvent is used in container or parent component tests, where user actions trigger state changes and update the UI. Presentational components are tested by changing props and checking the output.*/