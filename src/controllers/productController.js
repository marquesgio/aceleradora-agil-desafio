const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { nome, categoria, quantidade, preco } = req.body;

        if (!nome || !categoria || quantidade === undefined || preco === undefined) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios: nome, categoria, quantidade, preco',
            });
        }

        if (typeof quantidade !== 'number' || quantidade < 0) {
            return res.status(400).json({
                mensagem: 'Quantidade deve ser um número não negativo',
            });
        }

        if (typeof preco !== 'number' || preco < 0) {
            return res.status(400).json({
                mensagem: 'Preço deve ser um número não negativo',
            });
        }

        const product = new Product({
            nome,
            categoria,
            quantidade,
            preco,
        });

        await product.save();

        res.status(201).json({
            mensagem: 'Produto criado com sucesso',
            produto: product,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao criar produto',
            erro: error.message,
        });
    }
};

const listProducts = async (req, res) => {
    try {
        const { categoria, sortBy } = req.query;
        let query = {};

        if (categoria) {
            query.categoria = categoria;
        }

        let sortOptions = {};
        if (sortBy === 'nome') {
            sortOptions.nome = 1;
        } else if (sortBy === 'quantidade') {
            sortOptions.quantidade = 1;
        } else if (sortBy === 'preco') {
            sortOptions.preco = 1;
        }

        const products = await Product.find(query).sort(sortOptions);

        res.status(200).json({
            total: products.length,
            produtos: products,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao listar produtos',
            erro: error.message,
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { id, nome } = req.query;

        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado',
                });
            }
            return res.status(200).json({
                produto: product,
            });
        }

        if (nome) {
            const products = await Product.find({
                nome: { $regex: nome, $options: 'i' },
            });

            if (products.length === 0) {
                return res.status(404).json({
                    mensagem: 'Nenhum produto encontrado com esse nome',
                });
            }

            return res.status(200).json({
                total: products.length,
                produtos: products,
            });
        }

        res.status(400).json({
            mensagem: 'Informe um id ou nome para buscar',
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar produto',
            erro: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, categoria, quantidade, preco } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado',
            });
        }

        if (quantidade !== undefined) {
            if (typeof quantidade !== 'number' || quantidade < 0) {
                return res.status(400).json({
                    mensagem: 'Quantidade deve ser um número não negativo',
                });
            }
            product.quantidade = quantidade;
        }

        if (preco !== undefined) {
            if (typeof preco !== 'number' || preco < 0) {
                return res.status(400).json({
                    mensagem: 'Preço deve ser um número não negativo',
                });
            }
            product.preco = preco;
        }

        if (nome) product.nome = nome;
        if (categoria) product.categoria = categoria;

        await product.save();

        res.status(200).json({
            mensagem: 'Produto atualizado com sucesso',
            produto: product,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar produto',
            erro: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado',
            });
        }

        res.status(200).json({
            mensagem: 'Produto deletado com sucesso',
            produto: product,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao deletar produto',
            erro: error.message,
        });
    }
};

module.exports = {
    createProduct,
    listProducts,
    searchProduct,
    updateProduct,
    deleteProduct,
};
