from fastapi.responses import JSONResponse

from auth.dto import LoginInputDTO
from auth.exceptions import LoginError
from auth.repository import AuthRepository
from auth.utils import hash_password
from common.cookie import ProjectCookies
from users.dto import UserOutputDTO
from users.repository import UserRepository


class LoginUseCase:
    def __init__(
            self,
            auth_repository: AuthRepository,
            user_repository: UserRepository,
    ):
        self.auth_repository = auth_repository
        self.user_repository = user_repository

    async def execute(self, input_dto: LoginInputDTO) -> JSONResponse:
        user = await self.user_repository.get_by_email(input_dto.email)
        if not user:
            raise LoginError()

        hashed_password = hash_password(user.id, input_dto.password)
        if hashed_password != user.password:
            raise LoginError()

        session_id = await self.auth_repository.create_session(user.id)

        response = UserOutputDTO.from_orm(user).dict()
        response['created_at'] = response['created_at'].isoformat()
        response = JSONResponse(response)
        response.set_cookie(
            key=ProjectCookies.SESSION_ID.value,  # type: ignore
            value=session_id
        )
        return response
