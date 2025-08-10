import { type User, type InsertUser, type Mission, type InsertMission, type GameProgress, type InsertGameProgress, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMissions(): Promise<Mission[]>;
  getMissionByAccessCode(accessCode: string): Promise<Mission | undefined>;
  createMission(mission: InsertMission): Promise<Mission>;
  
  getGameProgress(sessionId: string): Promise<GameProgress | undefined>;
  updateGameProgress(sessionId: string, progress: Partial<GameProgress>): Promise<GameProgress>;
  createGameProgress(progress: InsertGameProgress): Promise<GameProgress>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private missions: Map<string, Mission>;
  private gameProgress: Map<string, GameProgress>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.missions = new Map();
    this.gameProgress = new Map();
    this.contactMessages = new Map();
    
    // Initialize with default mission
    const defaultMission: Mission = {
      id: randomUUID(),
      name: "Panique au Môle",
      accessCode: "12345",
      duration: "2-3 heures",
      difficulty: "Intermédiaire",
      recommendedAge: "12+",
      location: "Montagne du Môle (Outdoor)",
      isActive: true,
      createdAt: new Date(),
    };
    this.missions.set(defaultMission.id, defaultMission);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMissions(): Promise<Mission[]> {
    return Array.from(this.missions.values()).filter(mission => mission.isActive);
  }

  async getMissionByAccessCode(accessCode: string): Promise<Mission | undefined> {
    return Array.from(this.missions.values()).find(
      (mission) => mission.accessCode === accessCode && mission.isActive,
    );
  }

  async createMission(insertMission: InsertMission): Promise<Mission> {
    const id = randomUUID();
    const mission: Mission = { 
      ...insertMission, 
      id,
      createdAt: new Date(),
    };
    this.missions.set(id, mission);
    return mission;
  }

  async getGameProgress(sessionId: string): Promise<GameProgress | undefined> {
    return this.gameProgress.get(sessionId);
  }

  async updateGameProgress(sessionId: string, progress: Partial<GameProgress>): Promise<GameProgress> {
    const existing = this.gameProgress.get(sessionId);
    if (!existing) {
      throw new Error("Game progress not found");
    }
    const updated: GameProgress = {
      ...existing,
      ...progress,
      updatedAt: new Date(),
    };
    this.gameProgress.set(sessionId, updated);
    return updated;
  }

  async createGameProgress(insertProgress: InsertGameProgress): Promise<GameProgress> {
    const id = randomUUID();
    const progress: GameProgress = {
      ...insertProgress,
      id,
      updatedAt: new Date(),
    };
    this.gameProgress.set(insertProgress.sessionId, progress);
    return progress;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
