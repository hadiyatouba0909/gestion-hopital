const Rendezvous = require('../models/Rendezvous');
const Patient = require('../models/Patient');
const Medecin = require('../models/Medecin');

exports.creerRendezvous = async (req, res) => {
    try {
        const { date, heure, motif, patientId, medecinId } = req.body;
        
        // Vérifier si le patient et le médecin existent
        const patient = await Patient.findByPk(patientId);
        const medecin = await Medecin.findByPk(medecinId);
        
        if (!patient || !medecin) {
            return res.status(404).json({ message: "Patient ou médecin non trouvé" });
        }

        // Vérifier si le créneau est disponible
        const rendezvousExistant = await Rendezvous.findOne({
            where: {
                date,
                heure,
                medecinId,
                statut: 'programmé'
            }
        });

        if (rendezvousExistant) {
            return res.status(400).json({ message: "Ce créneau n'est pas disponible" });
        }

        const rendezvous = await Rendezvous.create({
            date,
            heure,
            motif,
            patientId,
            medecinId
        });

        res.status(201).json({
            message: "Rendez-vous créé avec succès",
            rendezvous
        });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du rendez-vous", error: error.message });
    }
};

exports.getRendezvous = async (req, res) => {
    try {
        const rendezvous = await Rendezvous.findAll({
            include: [
                {
                    model: Patient,
                    attributes: ['nom', 'prenom']
                },
                {
                    model: Medecin,
                    attributes: ['nom', 'prenom']
                }
            ]
        });
        res.json(rendezvous);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des rendez-vous", error: error.message });
    }
};

exports.updateRendezvous = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, heure, motif, statut } = req.body;

        const rendezvous = await Rendezvous.findByPk(id);
        if (!rendezvous) {
            return res.status(404).json({ message: "Rendez-vous non trouvé" });
        }

        await rendezvous.update({
            date,
            heure,
            motif,
            statut
        });

        res.json({ message: "Rendez-vous mis à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du rendez-vous", error: error.message });
    }
};

exports.deleteRendezvous = async (req, res) => {
    try {
        const { id } = req.params;
        const rendezvous = await Rendezvous.findByPk(id);
        
        if (!rendezvous) {
            return res.status(404).json({ message: "Rendez-vous non trouvé" });
        }

        await rendezvous.destroy();
        res.json({ message: "Rendez-vous supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la suppression du rendez-vous", error: error.message });
    }
};