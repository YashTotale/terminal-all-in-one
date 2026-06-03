import assert from "assert";
import debounce from "../../helpers/debounce";

suite("debounce", () => {
  test("fires once on the trailing edge after rapid calls", (done) => {
    let calls = 0;
    const d = debounce(() => calls++, 20);
    d();
    d();
    d();
    setTimeout(() => {
      assert.strictEqual(calls, 1);
      done();
    }, 60);
  });

  test("cancel() drops a pending call", (done) => {
    let calls = 0;
    const d = debounce(() => calls++, 20);
    d();
    d.cancel();
    setTimeout(() => {
      assert.strictEqual(calls, 0);
      done();
    }, 60);
  });
});
