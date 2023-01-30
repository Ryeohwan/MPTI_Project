package mpti.domain.opinion.application;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReportRequest;
import mpti.domain.opinion.api.request.ProcessReportRequest;
import mpti.domain.opinion.api.response.GetReportResponse;
import mpti.domain.opinion.api.response.ProcessReportResponse;
import mpti.domain.opinion.dao.ReportRepository;
import mpti.domain.opinion.dto.ReportDto;
import mpti.domain.opinion.entity.Report;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;


    public List<GetReportResponse> getReportList() {

        List<Report> reports = reportRepository.findAll();

        List<GetReportResponse> getReportResponseList = reports.stream()
                .map((report) -> new GetReportResponse(report))
                .collect(Collectors.toList());
        return getReportResponseList;
    }


    public ReportDto create(CreateReportRequest createReportRequest) {
        Report report = new Report();
        report.setWriterId(createReportRequest.getWriterId());
        report.setTargetId(createReportRequest.getTargetId());
        report.setMemo(createReportRequest.getMemo());
        // report 를 만드는 시점에는 정지일이 정해지지 않음.. 추후 관리자에의해 처리됨

        Optional<Report> SavedReport = Optional.of(reportRepository.save(report));
        ReportDto reportDto = new ReportDto(SavedReport);

        return reportDto;
    }


    public Optional<GetReportResponse> getReport(Long id) {
        Optional<Report> report = get(id);

        Optional<GetReportResponse> getReportResponse = Optional.of(new GetReportResponse(report.orElseThrow()));

        return getReportResponse;
    }

    public Optional<ProcessReportResponse> process(ProcessReportRequest processReportRequest) {
        Optional<Report> report = get(processReportRequest.getId());

        report.orElseThrow().setStopUntil(processReportRequest.getBlockPeriod());

        ProcessReportResponse processReportResponse = new ProcessReportResponse(report.orElseThrow().getId());

        return Optional.of(processReportResponse);
    }

    public Optional<Report> get(Long id){
        Optional<Report> report = reportRepository.findById(id);
        return report;
    }
}
