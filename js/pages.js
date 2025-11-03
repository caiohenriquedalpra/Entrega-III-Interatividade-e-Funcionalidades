export const productCardTemplate = `
    <div class="product-card">
        <h3>{{name}}</h3>
        <p>Preço: R$ {{price}}</p>
        <p class="description">{{description}}</p>
        <hr>
    </div>
`;

export const productsData = [
    { name: "Laptop X", price: "2.500,00", description: "Alto desempenho para multitarefas." },
    { name: "Smartphone Y", price: "1.200,00", description: "Câmera de alta resolução e bateria duradoura." },
    { name: "Monitor Z", price: "850,00", description: "Tela Ultra HD para cores vibrantes." }
];

export const pages = {
    home: `
        <h2>Seja Bem-vindo(a) à Aplicação SPA</h2>
        <p>Esta é a página inicial. A navegação entre as seções é feita sem recarregar a página (SPA Básico).</p>
        <p>Explore as funcionalidades de Roteamento, Templates e Validação de Formulário.</p>
    `,
    
    produtos: `
        <h2>Nossos Produtos Dinâmicos</h2>
        <p>O conteúdo abaixo foi gerado dinamicamente usando o **Sistema de Templates JavaScript**.</p>
        <div id="products-list">
            </div>
    `,
    
    contato: `
        <h2>Entre em Contato</h2>
        <p>Preencha o formulário abaixo. A validação de consistência é obrigatória para o envio!</p>
        
        <form id="contact-form">
            <label for="nome">Nome Completo (Obrigatório):</label>
            <input type="text" id="nome" name="nome" required data-validate>
            
            <label for="email">E-mail (Formato Válido):</label>
            <input type="email" id="email" name="email" required data-validate>
            
            <label for="mensagem">Mensagem (Mínimo 10 caracteres):</label>
            <textarea id="mensagem" name="mensagem" required minlength="10" data-validate></textarea>
            
            <button type="submit">Enviar Contato</button>
        </form>
    `,
    
    error404: `
        <h2>Erro 404</h2>
        <p>Página não encontrada. Verifique o endereço e tente novamente.</p>
    `
};