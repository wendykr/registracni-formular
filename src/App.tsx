import './App.scss';
import { Registration } from "./components/Registration/Registration";

export const App = () => {
  return (
    <div className="container">
      <h1 className="title">Registration</h1>
      <Registration />
    </div>
  );
};

export default App;