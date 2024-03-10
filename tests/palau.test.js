// arrange
testContainer.innerHTML = "<div></div>";
const inputContainer = document.querySelector("#input-root");
const initialPageState = {
  title: "Palau Test",
  nestedList: [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
  ],
  list: ["one", "two", "three"],
};

// act/assert
try {
  // reject invalid configurations
  // add custom message
  expect(() => Palau.init({ pageState: "invalid" })).to.throw(
    "pageState must be an object if specified"
  );
  expect(() =>
    Palau.init({
      components: [
        {
          root: ListContainer,
        },
      ],
    })
  ).to.throw(
    "Invalid component configuration: mountPoint and root are required in each component"
  );
  expect(() =>
    Palau.init({
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

  Palau.init({
    pageState: initialPageState,
    components: [
      {
        rootComponent: 'PalauListContainer',
        mountPoint: testContainer,
        listens: ["list", "nestedList"], // ensure multiple listeners work
        definitions: {
          PalauListContainer: () => `<div id="definition-list-container">
            <PalauListItem />  
          </div>`
        }
      },
      {
        rootComponent: PalauInput,
        mountPoint: inputContainer,
        listens: ['fakeKey', "*"],
      },
    ],
  });
  // initialization test
  expect(Palau).to.have.property("getPageState");
  expect(Palau).to.have.property("__setPageState");
  expect(Palau).to.have.property("putPageState");
  messages.push("Passed: Palau has expected properties and methods");

  // reject invalid configurations
  // add custom message
  expect(() => Palau.init({ pageState: "invalid" })).to.throw(
    "Palau has already been instantiated"
  );
  messages.push("Passed: Palau prevents reinitialization");

  // check components mounted
  expect(testContainer.querySelector("#definition-list-container")).to.not.be.null;
  expect(inputContainer.querySelector("#palau-input")).to.not.be.null;
  messages.push("Passed: Palau components mount to specified mount points");
  messages.push("Passed: Definition objects are passed to root components");

  // wildcard listener test
  expect(Palau.getPageState("fakeKey")).to.be.undefined;
  expect(Palau.components[1].listens).to.deep.equal(Object.keys(Palau.getPageState()));
  // method tests
  const listenerStrings = ["title", "list", "nestedList"];
  expect(Palau.__listenerStringsToObject(listenerStrings)).to.deep.equal(
    Palau.getPageState()
  );
  messages.push(
    "Passed: Palau.__listenerStringsToObject converts listener strings to object"
  );
  const pageState = Palau.getPageState();
  expect(pageState).to.deep.equal(initialPageState);
  expect(Palau.getPageState("title")).to.equal(
    initialPageState.title,
    "Failed to fetch pageState by key"
  );
  expect(Palau.getPageState("list[0].id")).to.equal(
    initialPageState.list[0].id,
    "Failed to fetch nested pageState by key"
  );
  messages.push("Passed: Palau.getPageState returns expected pageState");

  Palau.__setPageState({ list: [] });
  expect(Palau.getPageState("list")).to.deep.equal([]);
  expect(Palau.getPageState("title")).to.be.undefined;
  messages.push("Passed: Palau.setPageState updates pageState properly");

  // reset state and test putPageState
  Palau.__setPageState(initialPageState);
  Palau.putPageState({ title: "New Title" });
  expect(Palau.getPageState("title")).to.equal("New Title");
  expect(Palau.getPageState("list")).to.deep.equal(initialPageState.list);
  messages.push("Passed: Palau.putPageState updates pageState properly");

  // Do nothing when setPageState is called with no arguments
  Palau.__setPageState(initialPageState);
  expect(Palau.getPageState()).to.deep.equal(initialPageState);

  // click button to remove item from list in pageState and DOM
  const buttonRef = testContainer.querySelector("button");
  const tag = buttonRef.dataset.nauru;
  expect(Palau.getPageState("list").length).to.equal(3);
  buttonRef.click();
  expect(Palau.getPageState("list").length).to.equal(2);
  testContainer.querySelectorAll("[data-nauru]").forEach((el) => {
    expect(el.dataset.nauru).to.not.equal(tag);
  });

  messages.push(
    "Passed: Palau.putState() updates state and DOM properly when button is clicked"
  );

  // test input
  const inputRef = inputContainer.querySelector("input");
  inputRef.value = "new item";
  inputRef.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
  expect(Palau.getPageState("list").length).to.equal(3);
  expect(Palau.getPageState("list")[2]).to.equal("new item");
  messages.push(
    "Passed: listen array in component triggers rerenders when state is updated"
  );

  messages.push(
    "<strong style='color:green;'>Palau Test Suite Passed!</strong>"
  );
} catch (e) {
  console.error(e);
  messages.push(e.message);
  messages.push(
    "<strong style='color:red;'>Exiting Palau Test Suite with error</strong>"
  );
} finally {
  resultContainer.innerHTML = messages
    .map((message) => `<li>${message}</li>`)
    .join("");
}
