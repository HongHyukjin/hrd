package portfolio.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;

@AllArgsConstructor
@Getter
@Setter
public class MemberDTO {
    private String nick;
    private String email;
    private String pw;
    private String area;

    public Member toEntity() {
        return Member.builder()
                .nick(nick)
                .email(email)
                .pw(pw)
                .area(area)
                .build();
    }
}