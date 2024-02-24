// create hidden test div in document.body
const testContainer = document.createElement("div");
testContainer.id = "test-container";
// testContainer.style.display = "none";
document.body.appendChild(testContainer);

const listContainer = new Tuvalu({
  rootComponent: ListContainer,
  mountPoint: testContainer,
  state: {
    list: [],
  },
});

// allow for testing of Tuvalu without Palau implementation
const stateHandler = listContainer;

try {
  // empty state tests
  // should mount to testContainer
  expect(listContainer.mountPoint).to.equal(testContainer);
  messages.push("Passed: listContainer mounts to testContainer");
  // should read 'No items' in the testContainer
  expect(testContainer.querySelector("div").textContent).to.include("No items");
  expect(testContainer.querySelector("button")).to.be.null;
  messages.push("Passed: initial state renders by default <div>");

  // add item to list
  listContainer._setState({
    list: [
      { id: 1, name: "<strong>one</strong>" },
      { id: 2, name: "<strong>two</strong>" },
    ],
  });
  // should have one button
  expect(testContainer.querySelector("button")).to.not.be.null;
  expect(testContainer.querySelectorAll("button").length).to.equal(2);
  messages.push("Passed: items rerender when setState() is called");

  // should be able to fetch state by key name
  const firstListName = listContainer._getState("list")[0].name;
  expect(firstListName).to.be.a("string");
  expect(listContainer._getState().list[0].name === firstListName).to.be.true;
  messages.push("Passed: getState() works with and without key name");

  // HTML should be escaped when passed in state
  expect(firstListName).not.to.include(">");
  expect(firstListName).to.include("&lt;strong");
  expect(firstListName).not.to.include("<");
  expect(firstListName).to.include("&gt;one");
  messages.push("Passed: &lt and &gt are escaped in state");

  // put state should not interfere with other state
  listContainer.putState({ newList: "test" });
  expect(listContainer._getState("newList")).to.equal("test");
  expect(listContainer._getState("list").length).to.equal(2);
  messages.push("Passed: putState() does not interfere with other state");

  // clicking X button updates state properly
  testContainer.querySelector("button").click();
  expect(listContainer._getState("list").length).to.equal(
    1,
    "clicking X button does not update state properly"
  );

  // setState should completely overwrite state
  listContainer._setState({ list: [] });
  expect(listContainer._getState("list").length).to.equal(0);
  expect(listContainer._getState("newList")).to.be.undefined;
  messages.push("Passed: setState() completely overwrites state");

  messages.push(
    "<strong style='color:green;'>Tuvalu Test Suite Passed!</strong>"
  );
} catch (e) {
  messages.push(e.message);
  messages.push(
    "<strong style='color:red;'>Exiting Tuvalu Test Suite with error</strong>"
  );
} finally {
  resultContainer.innerHTML = messages
    .map((message) => `<li>${message}</li>`)
    .join("");
}
