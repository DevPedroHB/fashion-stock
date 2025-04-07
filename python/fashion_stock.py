import sqlite3

class Gestao:

    def __init__(self, banco):
        self.conn = sqlite3.connect(banco)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.criar_tabela_usuario()
        self.criar_tabela_categoria()
        self.criar_tabela_produto()

    def criar_tabela_usuario(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario ( 
                id INTEGER PRIMARY KEY, 
                nome VARCHAR(100) NOT NULL, 
                email VARCHAR(100) UNIQUE NOT NULL, 
                senha VARCHAR(255) NOT NULL, 
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )
        ''')
        self.conn.commit()

    def criar_tabela_categoria(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS categoria ( 
                id INTEGER PRIMARY KEY, 
                nome VARCHAR(100) NOT NULL, 
                descricao TEXT, 
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )
        ''')
        self.conn.commit()

    def criar_tabela_produto(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS produto ( 
                id INTEGER PRIMARY KEY, 
                nome VARCHAR(100) NOT NULL, 
                descricao TEXT, 
                categoria_id INTEGER,
                preco REAL NOT NULL, 
                quantidade_estoque INTEGER NOT NULL CHECK (quantidade_estoque >= 0), 
                data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE SET NULL 
            )
        ''')
        self.conn.commit()

    # Funções de Cadastro e Remoção de Usuários
    def cadastrar_usuario(self, nome, email, senha):
        cursor = self.conn.cursor()
        
        cursor.execute("SELECT * FROM usuario WHERE email = ?", (email,))
        if cursor.fetchone():
            print("Erro: Já existe um usuário com esse e-mail.")
            return False
        
        cursor.execute(''' INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?) ''', (nome, email, senha))
        self.conn.commit()
        print(f"Usuário '{nome}' cadastrado com sucesso!")
        return True

    def remover_usuario(self, id_usuario):
        cursor = self.conn.cursor()

        cursor.execute("SELECT * FROM usuario WHERE id = ?", (id_usuario,))
        if not cursor.fetchone():
            print("Erro: Usuário não encontrado.")
            return False

        cursor.execute("DELETE FROM usuario WHERE id = ?", (id_usuario,))
        self.conn.commit()
        print(f"Usuário com ID {id_usuario} removido com sucesso!")
        return True

    # Funções de Cadastro e Remoção de Categorias
    def cadastrar_categoria(self, nome, descricao=None):
        cursor = self.conn.cursor()
        
        cursor.execute("SELECT * FROM categoria WHERE nome = ?", (nome,))
        if cursor.fetchone():
            print("Erro: Já existe uma categoria com esse nome.")
            return False
        
        cursor.execute(''' INSERT INTO categoria (nome, descricao) VALUES (?, ?) ''', (nome, descricao))
        self.conn.commit()
        print(f"Categoria '{nome}' cadastrada com sucesso!")
        return True

    def remover_categoria(self, id_categoria):
        cursor = self.conn.cursor()

        cursor.execute("SELECT * FROM categoria WHERE id = ?", (id_categoria,))
        if not cursor.fetchone():
            print("Erro: Categoria não encontrada.")
            return False
        
        cursor.execute("SELECT * FROM produto WHERE categoria_id = ?", (id_categoria,))
        if cursor.fetchone():
            print("Erro: Não é possível remover a categoria. Ela está sendo usada em produtos.")
            return False
        
        cursor.execute("DELETE FROM categoria WHERE id = ?", (id_categoria,))
        self.conn.commit()
        print(f"Categoria com ID {id_categoria} removida com sucesso!")
        return True

    # Funções de Cadastro e Remoção de Produtos
    def cadastrar_produto(self, nome, descricao, preco, quantidade_estoque):
        cursor = self.conn.cursor()

        # Exibe as categorias existentes
        cursor.execute("SELECT id, nome FROM categoria")
        categorias = cursor.fetchall()
        
        if not categorias:
            print("Erro: Não há categorias cadastradas para selecionar.")
            return False
        
        print("Categorias existentes:")
        for categoria in categorias:
            print(f"ID: {categoria[0]}, Nome: {categoria[1]}")
        
        categoria_id = int(input("Informe o ID da categoria para o produto (selecione um ID listado acima): "))
        
        # Verifica se a categoria escolhida existe
        cursor.execute("SELECT * FROM categoria WHERE id = ?", (categoria_id,))
        if not cursor.fetchone():
            print("Erro: Categoria não encontrada.")
            return False
        
        cursor.execute(''' 
            INSERT INTO produto (nome, descricao, categoria_id, preco, quantidade_estoque) 
            VALUES (?, ?, ?, ?, ?) 
        ''', (nome, descricao, categoria_id, preco, quantidade_estoque))
        self.conn.commit()
        print(f"Produto '{nome}' cadastrado com sucesso!")
        return True

    def remover_produto(self, id_produto):
        cursor = self.conn.cursor()

        cursor.execute("SELECT * FROM produto WHERE id = ?", (id_produto,))
        if not cursor.fetchone():
            print("Erro: Produto não encontrado.")
            return False

        cursor.execute("DELETE FROM produto WHERE id = ?", (id_produto,))
        self.conn.commit()
        print(f"Produto com ID {id_produto} removido com sucesso!")
        return True
        
    # Função para listar todos os produtos
    def listar_produtos(self):
        cursor = self.conn.cursor()

        # Consulta para obter todos os produtos com suas respectivas categorias
        cursor.execute(''' 
            SELECT p.id, p.nome, p.descricao, c.nome, p.preco, p.quantidade_estoque 
            FROM produto p
            LEFT JOIN categoria c ON p.categoria_id = c.id
        ''')
        produtos = cursor.fetchall()

        if produtos:
            print("Lista de Produtos:")
            for produto in produtos:
                id_produto, nome_produto, descricao_produto, nome_categoria, preco, quantidade_estoque = produto
                print(f"ID: {id_produto}, Nome: {nome_produto}, Categoria: {nome_categoria}, Preço: {preco}, Descrição: {descricao_produto}, Estoque: {quantidade_estoque}")
        else:
            print("Nenhum produto encontrado.")

    # Funções para interagir com o usuário no menu
    def exibir_opcao_cadastro_usuario(self):
        nome = input("Nome do usuário: ")
        email = input("Email do usuário: ")
        senha = input("Senha do usuário: ")
        self.cadastrar_usuario(nome, email, senha)

    def exibir_opcao_remover_usuario(self):
        id_usuario = int(input("Informe o ID do usuário que deseja remover: "))
        self.remover_usuario(id_usuario)

    def exibir_opcao_cadastro_categoria(self):
        nome = input("Nome da categoria: ")
        descricao = input("Descrição da categoria (opcional): ")
        self.cadastrar_categoria(nome, descricao)

    def exibir_opcao_remover_categoria(self):
        id_categoria = int(input("Informe o ID da categoria que deseja remover: "))
        self.remover_categoria(id_categoria)

    def exibir_opcao_cadastro_produto(self):
        nome = input("Nome do produto: ")
        descricao = input("Descrição do produto (opcional): ")
        preco = float(input("Preço do produto: "))
        quantidade_estoque = int(input("Quantidade em estoque: "))
        self.cadastrar_produto(nome, descricao, preco, quantidade_estoque)

    def exibir_opcao_remover_produto(self):
        id_produto = int(input("Informe o ID do produto que deseja remover: "))
        self.remover_produto(id_produto)

# Função para exibir o menu
def exibir_menu():
    print("===== Menu de Gestão de Estoque =====")
    print("1. Cadastrar Usuário")
    print("2. Remover Usuário")
    print("3. Cadastrar Categoria")
    print("4. Remover Categoria")
    print("5. Cadastrar Produto")
    print("6. Remover Produto")
    print("7. Listar Produtos")
    print("8. Sair")

# Função principal
def main():
    sistema = Gestao("estoque.db")
    
    while True:
        exibir_menu()
        
        opcao = input("Escolha uma opção (1-8): ")

        if opcao == '1':
            sistema.exibir_opcao_cadastro_usuario()  # Chama a função para cadastrar um usuário
        elif opcao == '2':
            sistema.exibir_opcao_remover_usuario()  # Chama a função para remover um usuário
        elif opcao == '3':
            sistema.exibir_opcao_cadastro_categoria()  # Chama a função para cadastrar uma categoria
        elif opcao == '4':
            sistema.exibir_opcao_remover_categoria()  # Chama a função para remover uma categoria
        elif opcao == '5':
            sistema.exibir_opcao_cadastro_produto()  # Chama a função para cadastrar um produto
        elif opcao == '6':
            sistema.exibir_opcao_remover_produto()  # Chama a função para remover um produto
        elif opcao == '7':
            sistema.listar_produtos()  # Exibe todos os produtos cadastrados
        elif opcao == '8':
            print("Saindo...")
            break  # Encerra o programa
        else:
            print("Opção inválida! Por favor, escolha uma opção entre 1 e 9.")

# Inicia o programa
if __name__ == "__main__":
    main()
