import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    status: "active" | "inactive";
};


type InitialStateType = {
    allContacts: Contact[];
    contactToEdit: Contact | null;
};

const initialState: InitialStateType = {
    allContacts: [],
    contactToEdit: null,
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        removeContactToEdit: (state) => {
            state.contactToEdit = null;
        },
        setContactToEdit: (state, action: PayloadAction<Contact>) => {
            state.contactToEdit = action.payload;
        },
        addContact: (state, action: PayloadAction<Omit<Contact,"id">>) => {
            const allContacts = state.allContacts;
            const newContact = {id:crypto.randomUUID(),...action.payload};
            state.allContacts = [...allContacts, newContact];
        },
        removeContact: (state, action: PayloadAction<{ id: string }>) => {
            const newState = state.allContacts.filter((contact) =>
                contact.id !== action.payload.id
            );
            state.allContacts = newState;
        },
        editContact: (state, action: PayloadAction<Contact>) => {
            const { id, firstName, lastName, status } = action.payload;
            const editedContacts = state.allContacts.map((contact) => {
                if (contact.id === id) {
                    return {
                        ...contact,
                        firstName,
                        lastName,
                        status,
                    };
                }
                return contact;
            });
            state.allContacts = editedContacts;
        },
    },
});

export const {
    addContact,
    removeContactToEdit,
    removeContact,
    editContact,
    setContactToEdit,
} = contactSlice.actions;

export default contactSlice.reducer;
