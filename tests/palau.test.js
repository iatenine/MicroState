// arrange
testContainer.innerHTML = "";
const inputContainer = document.createElement("div");
inputContainer.id = "input-root";
document.body.appendChild(inputContainer);
const initialPageState = {
  title: "Palau Test",
  list: [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
  ],
};
const palau = new Palau({
  pageState: initialPageState,
  components: [
    {
      root: ListContainer,
      mountPoint: testContainer, // does not support default mount point
    },
    {
      root: Input,
      mountPoint: inputContainer,
      listens: ["list"], // must have match keys of pageState
    },
  ],
});

// act/assert
try {
  // initialization test
  expect(palau).to.be.a("object");
  expect(palau).to.have.property("getPageState");
  expect(palau).to.have.property("setPageState");
  expect(palau).to.have.property("putPageState");
  messages.push("Passed: Palau has expected properties and methods");

  // reject invalid configurations
  // add custom message
  expect(() => new Palau({ pageState: "invalid" })).to.throw(
    "pageState must be an object if specified"
  );
  expect(
    () =>
      new Palau({
        components: [
          {
            root: ListContainer,
          },
        ],
      })
  ).to.throw(
    "Invalid component configuration: mountPoint and root are required in each component"
  );
  expect(
    () =>
      new Palau({
        components: [
          {
            mountPoint: testContainer,
          },
        ],
      })
  ).to.throw(
    "Invalid component configuration: mountPoint and root are required in each component"
  );
  messages.push("Passed: Palau rejects invalid configurations");

  // method tests
  const pageState = palau.getPageState();
  expect(pageState).to.deep.equal(initialPageState);
  expect(palau.getPageState("title")).to.equal(
    initialPageState.title,
    "Failed to fetch pageState by key"
  );
  expect(palau.getPageState("list[0].id")).to.equal(
    initialPageState.list.list[0].id,
    "Failed to fetch nested pageState by key"
  );
  messages.push("Passed: Palau.getPageState returns expected pageState");

  palau.setPageState({ list: [] });
  expect(palau.getPageState("list")).to.deep.equal([]);
  expect(palau.getPageState("title")).to.be.undefined;
  messages.push("Passed: Palau.setPageState updates pageState properly");

  // reset state and test putPageState
  palau.setPageState(initialPageState);
  palau.putPageState({ title: "New Title" });
  expect(palau.getPageState("title")).to.equal("New Title");
  expect(palau.getPageState("list")).to.deep.equal(initialPageState.list);
  messages.push("Passed: Palau.putPageState updates pageState properly");

  // Do nothing when setPageState is called with no arguments
  palau.setPageState();
  expect(palau.getPageState()).to.deep.equal(initialPageState);

  // pub-sub tests
  // valid attempt to subscribe returns true from subscribeToPageState
  expect(palau.subscribeToPageState(() => {}, ["list"])).to.be.true;
  expect(palau.subscribeToPageState(() => {}, ["fake key"])).to.be.false;
  messages.push("Passed: Palau.subscribeToPageState returns expected value");

  let x = 0;
  const callback = () => {
    x++;
  };
  palau.subscribeToPageState(callback, ["list"]);
  palau.putPageState({ list: [] });
  expect(x).to.equal(1);
  messages.push("Passed: Palau.subscribeToPageState fires callback on change");

  // ensure components are rendered and update properly on state change
  palau.setPageState(initialPageState);
  expect(testContainer.querySelector("button")).to.not.be.null;
  expect(inputContainer.querySelector("input")).to.not.be.null;

  // click button to remove item from list
  const buttonRef = testContainer.querySelector("button");
  buttonRef.click();
  expect(document.querySelector(buttonRef)).to.be.null;

  messages.push(
    "<strong style='color:green;'>Palau Test Suite Passed!</strong>"
  );
} catch (e) {
  messages.push(e.message);
  messages.push(
    "<strong style='color:red;'>Exiting Palau Test Suite with error</strong>"
  );
} finally {
  resultContainer.innerHTML = messages
    .map((message) => `<li>${message}</li>`)
    .join("");
}
