import * as Yup from 'yup';

export default Yup.object().shape({
    cep: Yup.string().min(2).required(),
});