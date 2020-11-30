create table todos(
	id serial primary key,
    description text not null,
    completed boolean not null default false,
    due_date date,
);