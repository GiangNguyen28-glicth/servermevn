import { Body, Controller, Get, HttpStatus, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Response,Request } from 'express';
import { UserDTO } from './dto/user.dto';
import { GetUser } from 'src/common/decorators/getuser.decorators';
import { User } from './schema/user.schema';
import { AtGuard } from 'src/common/guards/At.guards';
import { GetCurrentRefreshToken } from 'src/common/decorators/getRefreshtoken.decorators';
import { RtGuard } from 'src/common/guards/Rt.guards';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOption} from 'src/utils/config.multer';
@Controller('users')
export class UserController {
    constructor(
        private userservice: UserService,
    ) { }

    @Post()
    async register(@Res() response: Response, @Body() userdto: UserDTO): Promise<any> {
        const data = await this.userservice.register(userdto);
        response.status(HttpStatus.CREATED).json({
            data: data,
            status: "success"
        })
    }

    @Post("/login")
    async login(@Body() { username, password }): Promise<any> {
        return await this.userservice.login({ username, password });
        // const cookie = `Authentication=${token.refreshToken}; HttpOnly; Path=/; Max-Age=${60*60*24}`;
        // response.setHeader('Set-Cookie', cookie);
        // return response.status(200).json({
        //     data:"Login success"
        // })
    }

    @UseGuards(AtGuard)
    @Get()
    async getUser(@GetUser() user: User): Promise<any> {
        return user;
    }

    @UseGuards(RtGuard)
    @Get('/refreshtoken')
    async refreshtoken(@GetCurrentRefreshToken() rf): Promise<any> {
        return await this.userservice.refreshtoken(rf._id, rf.refreshToken);
    }

    @Post('/forgotpassword')
    async forgotPassword(@Body() { email }): Promise<any> {
        return await this.userservice.forgotPassword({ email });
    }

    @Post('/resetpassword')
    async resetPassword(@Body() { token, password, password_confirm }): Promise<any> {
        return await this.userservice.resetpassword({ token, password, password_confirm });
    }

    @Get('/downloadreport')
    async download(@Res() res: Response): Promise<any> {
        return await this.userservice.downloadReportUserToExcel(res);
    }

    @Get('/exportreport')
    exportReport() {
        const workSheetColumns = ["ID", "Name"];
        const filePath = './outputfile/test.xlsx';
        const workSheetName = "Users";
        this.userservice.exportUserToExcel(workSheetColumns, workSheetName, filePath);
    }

    @Post('/importdata')
    @UseInterceptors(FileInterceptor('file', multerOption))
    importUser(@UploadedFile() file){
        console.log(file)
        this.userservice.importUser(file.path);
    }
}
