// arrange
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
      root: () => {},
      mountPoint: document.querySelector("#root"), // does not support default mount point
    },
    {
      root: () => {},
      mountPoint: document.querySelector("#input-root"),
      listens: ["list"], // must have match keys of pageState
    },
  ],
});

// act/assert
try {
  // initialization test
  expect(palau).to.be.a("object");
  messages.push("Passed: Palau is an object");
  expect(palau).to.have.property("getPageState");
  messages.push("Passed: Palau has a getPageState method");
  expect(palau).to.have.property("setPageState");
  messages.push("Passed: Palau has a setPageState method");
  expect(palau).to.have.property("putPageState");
  messages.push("Passed: Palau has a putPageState method");

  // method tests
  const pageState = palau.getPageState();
  expect(pageState).to.deep.equal(initialPageState);
  // pub-sub tests

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
