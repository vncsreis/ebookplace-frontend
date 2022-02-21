import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Read } from '../pages/Read';

export function Router() {
  return (
    <>
      <Route path='/' element={Home} />
      <Route path='/about' element={About} />
      <Route path='/read' element={Read} />
    </>
  );
}
