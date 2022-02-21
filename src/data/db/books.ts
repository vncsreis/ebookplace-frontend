import { Book } from "../models/Book";

export function filterFavourites(bookArr: Book[]) {
  return bookArr.filter((book) => book.favourite);
}

export const bookDB = [
  new Book(
    "a",
    "O Pequeno Príncipe",
    "Antoine de Saint-Exupéry",
    "1943",
    "https://images-na.ssl-images-amazon.com/images/I/71lyHAf7XXL.jpg",
    "http://localhost:3030/prince.epub",
    "fantasy",
    "Le Petit Prince é uma novela do escritor, aviador aristocrata francês Antoine de Saint-Exupéry, originalmente publicada em inglês e francês em abril de 1943 nos Estados Unidos. Durante a Segunda Guerra Mundial, Saint-Exupéry foi exilado para a América do Norte.",
    true,
    new Date("2020-06-06"),
    new Date("2021-06-06"),
    "a"
  ),
  new Book(
    "a",
    "O Príncipe",
    "Nicolau Maquiavel",
    "1532",
    "https://images-na.ssl-images-amazon.com/images/I/71de1OC-ZIL.jpg",
    "http://localhost:3030/pg1232.epub",
    "politics",
    "O Príncipe é um livro escrito por Nicolau Maquiavel em 1513, cuja primeira edição foi publicada postumamente, em 1532.",
    false,
    new Date("2020-06-06"),
    new Date("2021-06-06"),
    "a"
  ),
  new Book(
    "a",
    "Alice no País das Maravilhas",
    "Lewis Carroll",
    "1865",
    "https://kbimages1-a.akamaihd.net/f9cecada-c482-4baf-841b-61f83d8f8d53/1200/1200/False/alice-in-wonderland-collection-all-four-books.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "fantasy",
    "O livro conta a história de uma menina chamada Alice que cai numa toca de coelho que a transporta para um lugar fantástico povoado por criaturas peculiares e antropomórficas, revelando uma lógica do absurdo, característica dos sonhos. Este está repleto de alusões satíricas dirigidas tanto aos amigos como aos inimigos de Carroll, de paródias a poemas populares infantis ingleses ensinados no século XIX e também de referências linguísticas e matemáticas frequentemente através de enigmas que contribuíram para a sua popularidade. É assim uma obra de difícil interpretação pois contém dois livros num só texto: um para crianças e outro para adultos. ",
    false,
    new Date("2020-06-06"),
    new Date("2021-06-06"),
    "a"
  ),
  new Book(
    "a",
    "Estado e Revolução",
    "Vladimir Lênin",
    "1917",
    "https://boitempo-img.f1cdn.com.br/resizer/view/900/900/false/true/395.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "politics",
    "The State and Revolution is a book by Vladimir Lenin describing the role of the state in society, the necessity of proletarian revolution, and the theoretic inadequacies of social democracy in achieving revolution to establish the dictatorship of the proletariat",
    true,
    new Date("2021-07-08"),
    new Date("2022-01-01"),
    "a"
  ),
  new Book(
    "a",
    "Crepúsculo",
    "Stephenie Meyer",
    "2005",
    "https://upload.wikimedia.org/wikipedia/pt/5/56/Crep%C3%BAsculo_livro.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "romance",
    "Crepúsculo (Twilight, no original) é uma história sobre vampiros da autoria de Stephenie Meyer. Publicado em capa dura, em 2005, este livro é o início da saga Crepúsculo, onde Bella Swan é apresentada ao leitor, como uma estudante que se muda da sua casa que fica em Phoenix, Arizona, para Forks, Washington, nos Estados Unidos colocando sua vida e de sua família em risco ao apaixonar-se pelo vampiro Edward Cullen.",
    true,
    new Date("2021-08-07"),
    new Date("2021-10-11"),
    "a"
  ),
  new Book(
    "a",
    "O Ladrão de Raios",
    "Rick Riordan",
    "2005",
    "https://images-na.ssl-images-amazon.com/images/I/51prOSSk2YL._SX332_BO1,204,203,200_.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "action",
    "The Lightning Thief é o primeiro livro da série Percy Jackson & os Olimpianos baseado na mitologia grega, escrito por Rick Riordan., que narra a vida do adolescente Percy Jackson que descobre ser um semideus, filho de Poseidon com uma humana.",
    false,
    new Date("2019-09-12"),
    new Date("2021-09-11"),
    "a"
  ),
  new Book(
    "a",
    "O Iluminado",
    "Stephen King",
    "1977",
    "https://images.tcdn.com.br/img/img_prod/824711/o_iluminado_2271_1_20201019172849.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "thriller",
    "The Shining é um romance de horror do escritor estadunidense Stephen King. Lançado em 1977, foi o terceiro livro de Stephen King e seu primeiro best-seller em capa-dura. O sucesso do livro foi tanto que firmou King na carreira de escritor no gênero.",
    false,
    new Date("2019-08-07"),
    new Date("2020-10-11"),
    "a"
  ),
  new Book(
    "a",
    "O Manifesto Comunista",
    "K. Marx & F. Engels",
    "1848",
    "https://m.media-amazon.com/images/I/51xk4CYP15L.jpg",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "politics",
    "O Manifesto comunista, originalmente denominado Manifesto do Partido comunista, publicado pela primeira vez em 21 de fevereiro de 1848, é historicamente um dos tratados políticos de maior influência mundial.",
    false,
    new Date("2019-08-07"),
    new Date("2020-10-11"),
    "a"
  ),
  new Book(
    "a",
    "Vinte Mil Léguas Submarinas",
    "Julio Verne",
    "1870",
    "http://www.livroseaventuras.com/wp-content/uploads/2015/11/capa_vinte20mil20leguas20submarinas_final-1.jpg?w=202",
    "https://gerhardsletten.github.io/react-reader/files/alice.epub",
    "fantasy",
    "Vinte Mil Léguas Submarinas (no original, em francês: Vingt mille lieues sous les mers) é uma das obras literárias mais famosas do escritor Júlio Verne. Originalmente publicada em forma de uma série no periódico Magasin d'Éducation et de Récréation, de Março de 1869 a Junho de 1870, teve uma edição ilustrada publicada em Novembro de 1871, com 111 ilustrações por Alphonse de Neuville e Édouard Riou.",
    true,
    new Date("2019-08-07"),
    new Date("2020-10-11"),
    "a"
  ),
];

export const favourites = filterFavourites(bookDB);
