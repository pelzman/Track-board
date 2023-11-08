"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const database_1 = __importDefault(require("./config/database"));
const morgan_1 = __importDefault(require("morgan"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const task_route_1 = __importDefault(require("./routes/task-route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
database_1.default
    .sync({})
    .then(() => {
    console.log("Database is connected");
})
    .catch((err) => {
    console.log(err);
});
app.use("/api", user_route_1.default);
app.use("/api", task_route_1.default);
const server = http_1.default.createServer(app);
server.listen(config_1.port, () => {
    console.log(`API started at http://localhost:${config_1.port}`);
});
