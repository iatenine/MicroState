try {
  // check Nauru has static properties and methods
  expect(Nauru).to.have.property("count");
  expect(Nauru.count).to.be.a("number");
  messages.push("Passed: Nauru has a count property");
  expect(Nauru).to.have.property("events");
  expect(Nauru.events).to.be.an("array");
  messages.push("Passed: Nauru has an events array");

  // All Nauru properties and methods are static and may have been affected by earlier tests so clear them now
  Nauru.events = [];
  Nauru.count = 0;

  // check Nauru has a useListener method
  expect(Nauru).to.have.property("useListener");
  expect(Nauru.useListener).to.be.a("function");
  messages.push("Passed: Nauru has a useListener method");

  // check Nauru.useListener returns a string beginning with "data-nauru="
  const tag = Nauru.useListener();
  expect(tag).to.be.a("string");
  expect(tag).to.match(/^data-nauru=/);
  messages.push(
    "Passed: Nauru.useListener returns a string beginning with 'data-nauru='"
  );
  //   useListeners should be unique
  const tag2 = Nauru.useListener();
  expect(tag).to.not.equal(tag2);
  messages.push("Passed: Nauru.useListener returns unique tags");

  messages.push(
    "<strong style='color:green;'>Nauru Test Suite Passed!</strong>"
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
