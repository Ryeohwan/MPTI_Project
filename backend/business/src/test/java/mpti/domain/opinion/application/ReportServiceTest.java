package mpti.domain.opinion.application;

import mpti.domain.opinion.api.request.ProcessReportRequest;
import mpti.domain.opinion.dao.ReportRepository;
import mpti.domain.opinion.entity.Report;
import mpti.domain.opinion.entity.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Transactional
@SpringBootTest
class ReportServiceTest {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ReportService reportService;


    @Test
    @DisplayName("신고 작성")
    void create() {
        Report report = createSampleReport();

        Report savedReport = reportRepository.save(report);

        Report findReport = reportRepository.findById(savedReport.getId()).get();

        assertThat(report.getWriterId()).isEqualTo(findReport.getWriterId());
        assertThat(report.getWriterName()).isEqualTo(findReport.getWriterName());
        assertThat(report.getTargetId()).isEqualTo(findReport.getTargetId());
        assertThat(report.getTargetName()).isEqualTo(findReport.getTargetName());
        assertThat(report.getMemo()).isEqualTo(findReport.getMemo());
        assertThat(report.getReportType()).isEqualTo(findReport.getReportType());
        assertThat(report.getTargetRole()).isEqualTo(findReport.getTargetRole());
        assertThat(report.getCreatedAt()).isNotNull();

    }

    @Test
    @DisplayName("신고 처리")
    void process() throws IOException {

        Report report = createSampleReport();

        Report savedReport = reportRepository.save(report);

        int blockPeriod = 3;

//        reportService.process(new ProcessReportRequest(savedReport.getId(), Integer.parseInt(blockPeriod)));



        savedReport.setStopUntil(blockPeriod);

        assertThat(savedReport.getStopUntil()).isEqualTo(savedReport.getCreatedAt().plusDays(blockPeriod));
    }

    Report createSampleReport(){
        return Report.builder()
                .writerId(1L)
                .writerName("김회원")
                .targetId(2L)
                .targetName("비매너 트레이너")
                .memo("이 트레이너는 정말 매너가 없습니다.")
                .reportType("비매너")
                .targetRole(Role.TRAINER)
                .build();
    }
}