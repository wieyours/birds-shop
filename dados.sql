CREATE TABLE dados (
    id INTEGER,
    id_birds INTEGER,
    tipo TEXT,
    quantidade INTEGER,
    genero CHAR(1) CHECK (genero IN ('F', 'M')),
    legalizacao REAL DEFAULT 144.22,
    nomePessoa TEXT,
    pagamento CHAR(1) CHECK (pagamento IN ('P', 'C', 'A'))
    PRIMARY KEY (id, id_birds),
    FOREIGN KEY (id_birds) REFERENCES birds(id)
);
