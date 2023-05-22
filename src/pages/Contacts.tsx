import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../components/FormInput";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import contact, {
    addContact,
    editContact,
    removeContact,
    removeContactToEdit,
    setContactToEdit,
} from "../store/contact";
import { RootState } from "../store/store";
import type { Contact } from "../store/contact";

function Contacts() {
    const [isContactForm, setIsContactForm] = useState(false);
    function openContactForm() {
        setIsContactForm(true);
    }
    function closeContactForm() {
        setIsContactForm(false);
    }
    return (
        <main className="max-w-md mx-auto mt-20">
            {isContactForm
                ? <ContactForm closeContactForm={closeContactForm} />
                : <ContactList openContactForm={openContactForm} />}
        </main>
    );
}

const ContactList = (
    { openContactForm }: { openContactForm: () => void },
) => {
    const allContacts = useSelector((state: RootState) =>
        state.contacts.allContacts
    );

    return (
        <section className="mx-auto max-w-md flex flex-col  items-center">
            
            <Button
                onClick={openContactForm}
            >
                Create Contact
            </Button>

            {allContacts.length === 0 && (
                <article className="m-5 p-5 border bg-slate-50 text-gray-500">
                    <p className="text-center">
                        No contacts found, Please add contact from create contact button
                    </p>
                </article>
            )}

            <article className="grid sm:grid-cols-2 m-5 gap-5">
                {allContacts.map((contact) => (
                    <ContactCard
                        openContactForm={openContactForm}
                        contact={contact}
                        key={contact.id}
                    />
                ))}
            </article>
        </section>
    );
};

type ContactCardProps = {
    contact: Contact;
    openContactForm: () => void;
};

const ContactCard = ({ contact, openContactForm }: ContactCardProps) => {
    const dispatch = useDispatch();
    function deleteContact() {
        dispatch(removeContact({
            id: contact.id,
        }));
    }
    function editContact() {
        dispatch(setContactToEdit(contact));
        openContactForm();
    }

    return (
        <div className="rounded shadow p-5 bg-white">
            <ul className="text-lg">
                <li>
                    <strong>Name:</strong> {contact.firstName} {contact.lastName}
                </li>
                <li>
                    <strong>Status:</strong> {contact.status}
                </li>
            </ul>
            <div className="flex items-end justify-end gap-2.5 mt-2.5">
                <Button onClick={editContact} size='sm' variant="secondary">
                    Edit
                </Button>
                <Button onClick={deleteContact} size='sm' variant="danger">
                    Delete
                </Button>
            </div>
        </div>
    );
};

type FormData = Contact;

const initalFormData: FormData = {
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    status: "inactive",
};

const ContactForm = (
    { closeContactForm }: { closeContactForm: () => void },
) => {
    const contactToEdit = useSelector((state: RootState) =>
        state.contacts.contactToEdit
    );
    console.log(contactToEdit);
    const [formData, setFormData] = useState<FormData>(
        contactToEdit ?? initalFormData,
    );
    const isEditing = Boolean(contactToEdit);
    const dispatch = useDispatch();

    function onSubmitHandler(e: FormEvent) {
        e.preventDefault();
        const { firstName, lastName } = formData;
        if (!firstName || !lastName) return alert("Please fill out all fields");

        if (isEditing) {
            dispatch(editContact(formData));
            dispatch(removeContactToEdit());
        } else {
            dispatch(addContact(formData));
        }
        closeContactForm();
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <>
            <h1 className="text-2xl font-medium text-center mb-5">
                {isEditing ? "Edit" : "Create"} Contact Screen
            </h1>
            <form
                onSubmit={onSubmitHandler}
                className="  space-y-5 "
            >
                <section className="border space-y-3 p-5 bg-white">
                    <FormInput
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        name="firstName"
                        label="First Name:"
                    />
                    <FormInput
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        name="lastName"
                        label="Last  Name:"
                    />
                    <RadioGroup
                        name="status"
                        onChange={onChangeHandler}
                        label="Status:"
                        defaultValue={formData.status}
                    />
                </section>
                <div className="flex justify-center">
                    <Button>
                        Save {isEditing && "Edited"} Contact
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Contacts;
