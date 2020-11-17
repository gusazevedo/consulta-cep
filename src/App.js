import React from "react";
import { Formik, Field, Form } from "formik";
import Schema from "./schema";
import "./App.css";

function App() {
  function onSubmit(values, actions) {
    console.log("SUBMIT", values);
  }

  function onBlurCep(e, setFieldValue) {
    const { value } = e.target;

    // o regex só vai ler tudo que estiver de 0-9
    const cep = value?.replace(/[^0-9]/g, "");

    // O "?" é um optional chaining.
    // Se isso existe (lenght) quero acessar o valor de lenght
    if (cep?.length !== 8) {
      return;
    }

    // a alternativa para o fetch seria o axios
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }

  return (
    <div className="App">
      <Formik
        validationSchema={Schema}
        onSubmit={onSubmit}
        initialValues={{
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf: "",
        }}
        render={({ isValid, setFieldValue }) => (
          <Form>
            <h2>Verificar CEP</h2>
            <div className="form-control-group">
              <label>CEP:</label>
              <Field name="cep" type="text" onBlur={(e) => onBlurCep(e, setFieldValue)} />
            </div>
            <div className="form-control-group">
              <label>Logradouro:</label>
              <Field name="logradouro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Número:</label>
              <Field name="numero" type="text" />
            </div>
            <div className="form-control-group">
              <label>Complemento:</label>
              <Field name="complemento" type="text" />
            </div>
            <div className="form-control-group">
              <label>Bairro:</label>
              <Field name="bairro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Cidade:</label>
              <Field name="cidade" type="text" />
            </div>
            <div className="form-control-group">
              <label>Estado:</label>
              <Field name="uf" type="text" />
            </div>

            <button type="submit" disabled={!isValid}>
              Enviar
            </button>
          </Form>
        )}
      />
    </div>
  );
}

export default App;
