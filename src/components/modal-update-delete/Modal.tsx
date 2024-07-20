import { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'

Modal.setAppElement('#root'); // Define o elemento root para acessibilidade

export default function ModalUpdateDelete(props: { 
    isModalOpen: boolean,
    
    }) {

    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
    const [selectedTask, setSelectedTask] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Atualize a tarefa aqui
    closeModal();
    };

    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Atualizar Tarefa"
                className="modal"
                overlayClassName="modal-overlay"
                >
             <h3>modal aberto</h3>
            </Modal>
        </div>
      );
  }