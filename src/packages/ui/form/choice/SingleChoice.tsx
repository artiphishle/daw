import { Formik, Field, Form } from "formik";

export function SingleChoice() {
  <div>
    <h1>Single Choice</h1>
    <Formik
      initialValues={{
        picked: "",
      }}
      onSubmit={async (values) => {
        // eslint-disable-next-line no-alert
        alert("todo");
      }}
    >
      {({ values }) => (
        <Form>
          <div id="my-radio-group">Picked</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="picked" value="One" />
              One
            </label>
            <label>
              <Field type="radio" name="picked" value="Two" />
              Two
            </label>
            <div>Picked: {values.picked}</div>
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>;
}
