"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Base app
const App_1 = __importDefault(require("../App"));
const PillBoxLeds_1 = __importDefault(require("../../application/Shared/infrastructure/GPiO/components/PillBoxLeds"));
class PillBoxApp extends App_1.default {
    constructor() {
        super(PillBoxApp.name);
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                //We execute the main location interval use case, to update the location every X seconds (60 by default)
                let sectionCounter = 1;
                const pillBoxLeds = new PillBoxLeds_1.default();
                setInterval(() => {
                    pillBoxLeds.turnAllOf();
                    pillBoxLeds.turnOnSection(sectionCounter);
                    (sectionCounter === 14)
                        ? sectionCounter = 1
                        : sectionCounter++;
                });
            }
            catch (error) {
                this.logger.error(error.message);
            }
        });
        this.logger.info(`${PillBoxApp.name} service started`);
    }
}
exports.default = PillBoxApp;
