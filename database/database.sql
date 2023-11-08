CREATE TABLE propiedades(
    id smallint(5) unsigned auto_increment PRIMARY KEY,
    nombre varchar(100) not null,
    direccion varchar(200) not null,
    caracteristicas varchar(200) not null,
    estado varchar(20) not null,
    precioalquiler decimal(6,2) not null,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update CURRENT_TIMESTAMP
);