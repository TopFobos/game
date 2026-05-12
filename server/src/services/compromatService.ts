// server/src/services/compromatService.ts
import Compromat from '../models/Compromat';

export interface CompromatData {
  title: string;
  description: string;
  severity: number;
  tags: string[];
}

const compromatTemplates: CompromatData[] = [
  { title: "Секретные счета в офшорах", description: "Доказательства вывода миллионов за границу", severity: 4, tags: ["corruption", "finance"] },
  { title: "Связь с иностранной разведкой", description: "Переписка с представителями чужой страны", severity: 5, tags: ["treason"] },
  { title: "Коррупционная схема с госзакупками", description: "Откаты при закупках военной техники", severity: 4, tags: ["corruption"] },
  { title: "Личная причастность к убийству", description: "Свидетельства организации заказного убийства", severity: 5, tags: ["murder"] },
  { title: "Скандал с несовершеннолетними", description: "Компрометирующие фото и видео", severity: 5, tags: ["scandal"] },
  { title: "Фальсификация выборов", description: "Доказательства подтасовки результатов", severity: 4, tags: ["election"] },
];

export class CompromatService {
  async generateCompromat(roomId: string, ownerId: string, targetId: string) {
    const template = compromatTemplates[Math.floor(Math.random() * compromatTemplates.length)];

    const compromat = await Compromat.create({
      roomId,
      ownerId,
      targetId,
      title: template.title,
      description: template.description,
      severity: template.severity,
      tags: template.tags,
      createdTurn: 1, // будет динамическим
      used: false
    });

    return compromat;
  }

  async getPlayerCompromats(roomId: string, ownerId: string) {
    return Compromat.find({ roomId, ownerId, used: false });
  }

  async useCompromat(compromatId: string) {
    const compromat = await Compromat.findById(compromatId);
    if (!compromat) throw new Error('Компромат не найден');
    
    compromat.used = true;
    await compromat.save();
    return compromat;
  }
}

export default new CompromatService();